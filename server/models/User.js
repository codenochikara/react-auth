const mongoose = require('mongoose');
const { editor } = require('../utils/constants/rolesList');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  roles: {
    user: {
      type: Number,
      default: 2309,
    },
    editor: Number,
    admin: Number,
  },
  password: {
    type: String,
    required: true,
    // min: 6,
  },
  refreshToken: String
  /* refreshToken: {
    type: String,
    default: null,
  }, */
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
