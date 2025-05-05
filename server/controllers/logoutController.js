const fsp = require('fs').promises;
const { set } = require('date-fns/set');
const path = require('path');

const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data; }
}

const handleLogout = async (req, res) => {
  // Clear the cookie with the refresh token - on client, also clear the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Check if refresh token is with some user in the database
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); // Secure: true - only for HTTPS
    return res.sendStatus(204);
  }

  // Delete refresh token from the database
  const currentUser = { ...foundUser, refreshToken: '' }; // Clear refresh token
  usersDB.setUsers(usersDB.users.map((user) => (user.username === foundUser.username ? currentUser : user)));
  await fsp.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

  // Clear the cookie with the refresh token
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
  // res.sendStatus(204);
  res.status(200).json({ "success": `User ${foundUser.username} logged out successfully.` });
}

module.exports = {
  handleLogout
};
