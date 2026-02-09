const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "vault_data";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const data = await redis.get(KEY);
      return res.status(200).json(data || { custom: [], favorites: [] });
    }

    if (req.method === "POST") {
      const { custom, favorites } = req.body;
      if (!Array.isArray(custom) || !Array.isArray(favorites)) {
        return res.status(400).json({ error: "Format invalide" });
      }
      await redis.set(KEY, { custom, favorites });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Méthode non autorisée" });
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur : " + e.message });
  }
};
