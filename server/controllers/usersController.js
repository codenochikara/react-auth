const UserModel = require('../models/User');
const ROLES_LIST = require('../utils/constants/rolesList');

const getAllUsers = async (req, res) => {
  const users = await UserModel.find().lean();
  if (!users || !users.length) {
    return res.status(404).json({ "message": 'No users found.' }); // Can also use res.sendStatus(204) for no content
  }
  res.json(users);
}

const deleteUserById = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: 'User ID is required to delete a user.' });
  }

  const userToDelete = await UserModel.findOne({ _id: req.body.id });
  if (!userToDelete) {
    return res.status(404).json({ "message": `No user found matching ID ${req.body.id}.` });
  }

  await userToDelete.deleteOne();
  const allUsers = await UserModel.find().lean();

  res.status(201).json({
    message: `User with the ID ${req.body.id} deleted successfully.`,
    deletedUser: userToDelete,
    allUsers
  });
}

const getUserById = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'User ID is required to get a user.' });
  }

  const foundUser = await UserModel.findOne({ _id: req.params.id }).lean();
  if (!foundUser) {
    return res.status(404).json({ "message": `No user found matching ID ${req.params.id}.` });
  }

  res.json(foundUser);
}

const updateUserById = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'User ID is required to update a user.' });
  }

  if (!req?.body?.username && !req?.body?.roles) {
    return res.status(400).json({ message: 'At least one param is required to update a user.' });
  }

  const foundUser = await UserModel.findOne({ _id: req.params.id });
  if (!foundUser) {
    return res.status(404).json({ "message": `No user found matching ID ${req.params.id}.` });
  }

  if (req.body?.username) foundUser.username = req.body.username;
  if (req.body?.roles) {
    const incomingRoles = req.body.roles; // Example of incoming roles: ["admin", "user"]

    // Validate roles
    const invalidRoles = incomingRoles.filter(role => !(role in ROLES_LIST));
    if (invalidRoles.length) {
      return res.status(400).json({ message: `Invalid roles: ${invalidRoles.join(', ')}` });
    }

    const updatedRoles = {};
    incomingRoles.forEach(role => {
      if (ROLES_LIST[role]) updatedRoles[role] = ROLES_LIST[role];
    });

    foundUser.roles = updatedRoles;
  }

  // await User.findByIdAndUpdate(userId, { roles: rolesToUpdate });
  await foundUser.save();
  const allUsers = await UserModel.find().lean();

  res.status(201).json({
    message: `User with the ID ${req.body.id} updated successfully.`,
    updatedUser: foundUser,
    allUsers
  });
}

module.exports = {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById
};
