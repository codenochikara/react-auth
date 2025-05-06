const UserModel = require('../models/User');

const handleLogout = async (req, res) => {
  // Clear the cookie with the refresh token - on client, also clear the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Check if refresh token is with some user in the database
  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); // Secure: true - only for HTTPS
    return res.sendStatus(204);
  }

  // Delete the user's refresh token from the database

  // const currentUser = { ...foundUser, refreshToken: '' }; // Clear refresh token
  // await UserModel.findByIdAndUpdate(foundUser._id, currentUser, { new: true }).exec();
  // await foundUser.updateOne({ refreshToken: '' }); // Update the user in the database to remove the refresh token

  foundUser.refreshToken = ''; // Update the foundUser document
  await foundUser.save(); // Save the updated user to the database

  // Clear the cookie with the refresh token
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
  // res.sendStatus(204);
  res.status(200).json({ "success": `User ${foundUser.username} logged out successfully.` });
}

module.exports = {
  handleLogout
};
