const { Resend } = require("resend");
const { Redis } = require("@upstash/redis");

const RATE_LIMIT = 3;
const WINDOW_SECONDS = 3600;

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function checkRateLimit(ip) {
  const key = `rate:submit:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, WINDOW_SECONDS);
  return count;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    "unknown";

  try {
    const count = await checkRateLimit(ip);
    if (count > RATE_LIMIT) {
      return res.status(429).json({ error: "Trop de propositions. Réessaie dans une heure." });
    }
  } catch {}

  const { url, description, contact } = req.body || {};

  if (!url || !url.trim()) {
    return res.status(400).json({ error: "L'URL est requise." });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "URL invalide." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lines = [
    `<p><strong>URL :</strong> <a href="${url}">${url}</a></p>`,
    description?.trim() ? `<p><strong>Description :</strong> ${description.trim()}</p>` : "",
    contact?.trim() ? `<p><strong>Contact :</strong> ${contact.trim()}</p>` : "",
    `<p style="color:#666;font-size:12px">IP : ${ip}</p>`,
  ].filter(Boolean).join("\n");

  await resend.emails.send({
    from: "Vault <no-reply@qyrn.dev>",
    to: process.env.CONTACT_EMAIL,
    subject: "Vault — Nouvelle proposition de ressource",
    html: `<div style="font-family:monospace">${lines}</div>`,
  });

  return res.status(200).json({ ok: true });
};
