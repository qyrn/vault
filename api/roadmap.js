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
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #08080d; color: #e0e0e0; font-family: 'IBM Plex Mono', monospace; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.box { background: #0f0f1a; border: 1px solid #ffffff15; border-radius: 12px; padding: 40px; width: 100%; max-width: 360px; }
h1 { font-size: 16px; color: #00ff88; margin-bottom: 6px; }
p { font-size: 11px; color: #555; margin-bottom: 28px; }
input[type=password] { width: 100%; background: #08080d; border: 1px solid #ffffff18; border-radius: 8px; padding: 12px 16px; color: #e0e0e0; font-family: inherit; font-size: 14px; outline: none; margin-bottom: 12px; }
input[type=password]:focus { border-color: #00ff8855; }
button { width: 100%; background: #00ff8815; border: 1px solid #00ff8835; border-radius: 8px; padding: 12px; color: #00ff88; font-family: inherit; font-size: 13px; cursor: pointer; transition: background 0.15s; }
button:hover { background: #00ff8825; }
.err { color: #ff6b6b; font-size: 11px; margin-bottom: 12px; }
a { color: #444; font-size: 11px; display: block; text-align: center; margin-top: 20px; text-decoration: none; }
a:hover { color: #777; }
</style>
</head>
<body>
<div class="box">
  <h1>// Roadmap 2026</h1>
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
