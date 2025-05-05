const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsp = require('fs').promises;
const path = require('path');

const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data; }
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });
  // Check for existing users in the database
  const foundUser = usersDB.users.find(user => user.username === username);
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
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
    const currentUser = { ...foundUser, refreshToken }; // Add refreshToken to the user object
    // Update the users database with the new refresh token
    const updatedUsers = usersDB.users.map((user) =>
      user.username === foundUser.username ? currentUser : user
    );
    usersDB.setUsers(updatedUsers);
    await fsp.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(usersDB.users));

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true, // Ensures that the cookie is only sent over HTTPS connections
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ accessToken, "success": `User ${username} is logged in.` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = {
  handleLogin
};
