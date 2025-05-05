const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/registerController');

router.post('/', createUser);

module.exports = { registerRouter: router };
