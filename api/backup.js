const { Redis } = require("@upstash/redis");
const crypto = require("crypto");

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "vault_data";

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

function isAdmin(req) {
  const cookies = parseCookies(req.headers.cookie);
  const userId = verifySessionToken(cookies.session, process.env.SESSION_SECRET);
  return userId && userId === process.env.ADMIN_GITHUB_ID;
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Non autorisé" });
  }

  try {
    const data = await redis.get(KEY);
    const backup = data || { custom: [], favorites: [], deletedBuiltins: [], editedBuiltins: [] };

    const date = new Date().toISOString().split('T')[0];
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="vault-backup-${date}.json"`);

    return res.status(200).json(backup);
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur : " + e.message });
  }
};
