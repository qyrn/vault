const crypto = require('crypto');

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const cookies = parseCookies(req.headers.cookie);
  const userId = verifySessionToken(cookies.session, process.env.SESSION_SECRET);

  if (!userId) {
    return res.status(200).json({ authenticated: false, isAdmin: false });
  }

  const isAdmin = userId === process.env.ADMIN_GITHUB_ID;

  return res.status(200).json({
    authenticated: true,
    isAdmin: isAdmin,
    userId: userId
  });
};
