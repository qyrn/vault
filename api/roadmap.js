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

function verifySessionToken(token, secret) {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId, timestamp, hmac] = decoded.split(':');
    const data = `${userId}:${timestamp}`;
    const expectedHmac = crypto.createHmac('sha256', secret).update(data).digest('hex');
    if (hmac === expectedHmac) {
      const age = Date.now() - parseInt(timestamp, 10);
      if (age < 7 * 24 * 60 * 60 * 1000) {
        return userId;
      }
    }
    return null;
  } catch {
    return null;
  }
}

module.exports = async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const userId = verifySessionToken(cookies.session, process.env.SESSION_SECRET);

  if (!userId) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send('<h1>401 - Non autorisé</h1><p>Connecte-toi d\'abord.</p><a href="/">Retour au Vault</a>');
  }

  const isAdmin = userId === process.env.ADMIN_GITHUB_ID;

  if (!isAdmin) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send('<h1>403 - Accès refusé</h1><p>Cette page est privée.</p><a href="/">Retour au Vault</a>');
  }

  try {
    const roadmapPath = path.join(process.cwd(), 'private', 'roadmap.html');
    const html = fs.readFileSync(roadmapPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-cache');
    return res.status(200).send(html);
  } catch (err) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send('<h1>500 - Erreur</h1><p>Fichier roadmap introuvable.</p>');
  }
};
