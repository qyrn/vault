const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Redis } = require("@upstash/redis");

const RATE_LIMIT = 15;
const WINDOW_SECONDS = 3600;

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function checkRateLimit(ip) {
  const key = `rate:extract:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }
  return count;
}

const ALLOWED_TAGS = [
  "Outil", "CTF", "Blog", "Formation", "Cheatsheet", "OSINT",
  "Forensic", "Réseau", "Web", "Exploit", "RE", "Privesc",
  "Recon", "Framework", "Cours", "Certif", "News", "Writeups",
  "Référence", "Utilitaire", "Autre"
];

function cleanHtml(html) {
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.substring(0, 15000);
}

function fallbackRegex(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
    html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "",
    tag: "Autre",
    source: "regex"
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      "unknown";

    try {
      const count = await checkRateLimit(ip);
      if (count > RATE_LIMIT) {
        return res.status(429).json({ error: "Trop de requêtes. Réessaie dans une heure." });
      }
    } catch {
    }

    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Paramètre ?url= requis" });

    let html;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; VaultBot/1.0)",
          "Accept": "text/html,application/xhtml+xml,*/*",
        },
        redirect: "follow",
        signal: controller.signal,
      });
      html = await response.text();
      clearTimeout(timeout);
    } catch (e) {
      return res.status(502).json({ error: "Impossible de récupérer la page : " + e.message });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json(fallbackRegex(html));
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const pageText = cleanHtml(html);
      const prompt = `Analyse cette page web et retourne un JSON avec exactement 3 champs :
- "title" : un titre court et clair en français (max 60 caractères)
- "description" : une seule phrase courte en français, max 80 caractères
- "tag" : un seul tag parmi cette liste : ${ALLOWED_TAGS.join(", ")}

Contenu de la page :
${pageText}

Réponds UNIQUEMENT avec le JSON, sans backticks, sans explication.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      let parsed;
      try {
        const jsonStr = text.replace(/```json?\s*/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(jsonStr);
      } catch {
        return res.status(200).json(fallbackRegex(html));
      }

      if (!ALLOWED_TAGS.includes(parsed.tag)) {
        parsed.tag = "Autre";
      }

      let desc = (parsed.description || "").substring(0, 100);
      if (parsed.description && parsed.description.length > 100) desc = desc.replace(/\s+\S*$/, "") + "...";

      return res.status(200).json({
        title: parsed.title || "",
        description: desc,
        tag: parsed.tag || "Autre",
        source: "gemini"
      });
    } catch (e) {
      return res.status(200).json(fallbackRegex(html));
    }
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur : " + e.message });
  }
};
