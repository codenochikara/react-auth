const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/', 'subviews', 'index.html'));
})

router.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/', 'subviews', 'test.html'));
})

module.exports = { subviewsRouter: router };
