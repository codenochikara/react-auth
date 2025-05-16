const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });

  // Check for existing users in the database
  const foundUser = await UserModel.findOne({ username });
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // Create JWT token for authentication
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
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Store refresh token in the database with the current user
    foundUser.refreshToken = refreshToken; // Add refreshToken to the foundUser document
    await foundUser.save(); // Save the updated user to the database

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true, // Ensures that the cookie is only sent over HTTPS connections
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ roles, accessToken, "success": `User ${username} is logged in.` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = {
  handleLogin
};
