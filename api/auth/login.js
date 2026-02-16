const crypto = require('crypto');

module.exports = async function handler(req, res) {
  const state = crypto.randomBytes(16).toString('hex');

  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`);

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/callback`,
    scope: 'read:user',
    state: state
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
