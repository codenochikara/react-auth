const express = require('express');
const { handleRefreshJWT } = require('../controllers/refreshJWTController');
const router = express.Router();

router.get('/', handleRefreshJWT);

module.exports = {
  refreshRouter: router
};
