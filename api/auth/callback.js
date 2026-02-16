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

function createSessionToken(userId, secret) {
  const data = `${userId}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', secret).update(data).digest('hex');
  return Buffer.from(`${data}:${hmac}`).toString('base64');
}

module.exports = async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);

  if (!code || !state || state !== cookies.oauth_state) {
    return res.status(400).send('Invalid OAuth state');
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).send('OAuth error: ' + tokenData.error_description);
    }

    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'Vault-App'
      }
    });

    const userData = await userRes.json();
    const githubId = String(userData.id);
    const isAdmin = githubId === process.env.ADMIN_GITHUB_ID;

    const sessionToken = createSessionToken(githubId, process.env.SESSION_SECRET);

    const cookieOptions = 'Path=/; HttpOnly; SameSite=Lax; Max-Age=604800';
    res.setHeader('Set-Cookie', [
      `session=${sessionToken}; ${cookieOptions}`,
      `github_id=${githubId}; ${cookieOptions}`,
      `is_admin=${isAdmin ? '1' : '0'}; Path=/; SameSite=Lax; Max-Age=604800`,
      'oauth_state=; Path=/; HttpOnly; Max-Age=0'
    ]);

    res.redirect(302, '/');
  } catch (err) {
    return res.status(500).send('OAuth callback error: ' + err.message);
  }
};
