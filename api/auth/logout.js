module.exports = async function handler(req, res) {
  res.setHeader('Set-Cookie', [
    'session=; Path=/; HttpOnly; Max-Age=0',
    'github_id=; Path=/; HttpOnly; Max-Age=0',
    'is_admin=; Path=/; Max-Age=0'
  ]);

  res.redirect(302, '/');
};
