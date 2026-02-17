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
  const origin = req.headers.origin;
  const allowedOrigins = [process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null, 'http://localhost:3000', 'http://localhost:5173'].filter(Boolean);
  if (origin && allowedOrigins.some(o => origin.startsWith(o) || origin.includes('vercel.app'))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const data = await redis.get(KEY);
      if (!data) {
        return res.status(200).json({ custom: [], favorites: [], deletedBuiltins: [], editedBuiltins: [] });
      }
      if (!isAdmin(req)) {
        const filteredData = {
          ...data,
          custom: (data.custom || []).filter(item => !item.isPrivate)
        };
        return res.status(200).json(filteredData);
      }
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      if (!isAdmin(req)) {
        return res.status(403).json({ error: "Non autorisé" });
      }

      const { custom, favorites, deletedBuiltins, editedBuiltins } = req.body;
      if (!Array.isArray(custom) || !Array.isArray(favorites)) {
        return res.status(400).json({ error: "Format invalide" });
      }
      await redis.set(KEY, {
        custom,
        favorites,
        deletedBuiltins: Array.isArray(deletedBuiltins) ? deletedBuiltins : [],
        editedBuiltins: Array.isArray(editedBuiltins) ? editedBuiltins : []
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Méthode non autorisée" });
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur : " + e.message });
  }
};
