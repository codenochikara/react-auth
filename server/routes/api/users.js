const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../utils/constants/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');
const { updateUserById, getAllUsers, deleteUserById, getUserById } = require('../../controllers/usersController');

// Routes

router.route('/')
  .get(verifyRoles(ROLES_LIST.admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.admin), deleteUserById);

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.admin), getUserById)
  .put(verifyRoles(ROLES_LIST.admin), updateUserById)

module.exports = { usersRouter: router };
