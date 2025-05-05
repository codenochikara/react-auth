const jwt = require('jsonwebtoken');

const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data; }
}

const handleRefreshJWT = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  console.log(cookies.jwt);

  // Check if refresh token is in the database
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden
    const accessToken = jwt.sign(
      { "username": decoded.username },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.json({ accessToken, "success": `Access token re-generated for user ${decoded.username}.` });
  });
}

module.exports = {
  handleRefreshJWT
};
