const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const handleRefreshJWT = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  console.log(cookies.jwt);

  // Check if refresh token is in the database
  const foundUser = await UserModel.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: roles // Hide the role names and only expose the codes
        }
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' }
    );
    res.json({ accessToken, "success": `Access token re-generated for user ${decoded.username}.` });
  });
}

module.exports = {
  handleRefreshJWT
};
