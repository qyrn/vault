const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    cookies[name.trim()] = rest.join('=').trim();
  });
  return cookies;
}

function generateToken(pin) {
  return crypto.createHmac('sha256', pin).update('roadmap-access').digest('hex');
}

function loginForm(error) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Roadmap — Accès privé</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Syne:wght@600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
::selection { background: rgba(124,58,237,0.35); color: #fff; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0a0a0f; }
::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 3px; }
body { background: #0a0a0f; color: #e2e2e8; font-family: 'Outfit', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; -webkit-font-smoothing: antialiased; }
.orb { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
.orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%); top: -100px; left: -100px; animation: drift 18s ease-in-out infinite; }
.orb-2 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%); bottom: -80px; right: -80px; animation: drift 22s ease-in-out infinite reverse; }
@keyframes drift { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.03); } 66% { transform: translate(-10px,10px) scale(0.97); } }
.box { position: relative; z-index: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 40px; width: 100%; max-width: 360px; }
h1 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px; letter-spacing: 0.3px; }
p { font-size: 12px; color: rgba(255,255,255,0.3); margin-bottom: 28px; }
input[type=password] { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 16px; color: #e2e2e8; font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; margin-bottom: 12px; transition: border-color 0.2s; }
input[type=password]:focus { border-color: rgba(124,58,237,0.5); background: rgba(124,58,237,0.05); }
input[type=password]::placeholder { color: rgba(255,255,255,0.2); }
button { width: 100%; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.35); border-radius: 10px; padding: 12px; color: #a78bfa; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
button:hover { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5); color: #c4b5fd; }
.err { color: #f87171; font-size: 11px; margin-bottom: 12px; padding: 8px 12px; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2); border-radius: 8px; }
a { color: rgba(255,255,255,0.2); font-size: 11px; display: block; text-align: center; margin-top: 20px; text-decoration: none; transition: color 0.2s; }
a:hover { color: rgba(255,255,255,0.5); }
</style>
</head>
<body>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="box">
  <h1>Roadmap 2026</h1>
  <p>Accès privé</p>
  ${error ? `<div class="err">${error}</div>` : ''}
  <form method="POST">
    <input type="password" name="pin" placeholder="Code d'accès" autofocus autocomplete="off">
    <button type="submit">Accéder</button>
  </form>
  <a href="/">← Retour au Vault</a>
</div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  const pin = process.env.ROADMAP_PIN;

  if (!pin) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send('<h1>500</h1><p>ROADMAP_PIN non configuré.</p>');
  }

  const expectedToken = generateToken(pin);

  if (req.method === 'POST') {
    let body = '';
    await new Promise(resolve => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
    const params = new URLSearchParams(body);
    const submitted = params.get('pin') || '';

    if (submitted === pin) {
      res.setHeader('Set-Cookie', `roadmap_access=${expectedToken}; HttpOnly; Secure; SameSite=Strict; Path=/api/roadmap; Max-Age=${7 * 24 * 60 * 60}`);
      try {
        const roadmapPath = path.join(process.cwd(), 'private', 'roadmap.html');
        const html = fs.readFileSync(roadmapPath, 'utf-8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'private, no-cache');
        return res.status(200).send(html);
      } catch {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send('<h1>500</h1><p>Fichier roadmap introuvable.</p>');
      }
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send(loginForm('Code incorrect.'));
  }

  const cookies = parseCookies(req.headers.cookie);

  if (cookies.roadmap_access !== expectedToken) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(loginForm(''));
  }

  try {
    const roadmapPath = path.join(process.cwd(), 'private', 'roadmap.html');
    const html = fs.readFileSync(roadmapPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-cache');
    return res.status(200).send(html);
  } catch {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send('<h1>500</h1><p>Fichier roadmap introuvable.</p>');
  }
};
