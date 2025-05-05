const express = require('express');
const { handleLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/', handleLogin);

exports.authRouter = router;
