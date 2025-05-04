const express = require('express');
const router = express.Router();
const path = require('path');

const indexRouteRegex = /^\/$|\/index(.html)?/; // '^/$|/index(.html)?' - Matches both '/' and '/index' or '/index.html'
const newPageRouteRegex = /^\/new-page(.html)?/; // '/new-page(.html)?' - Matches both '/new-page' and '/new-page.html'

// GET routes

router.get(indexRouteRegex, (req, res) => {
  // res.send('Hello World!');
  // res.sendFile('./views/index.html', { root: __dirname });
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get(newPageRouteRegex, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'new-page.html'));
});

router.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page'); // 302 - Temporary redirect (by default), 301 - Permanent redirect (saved in browser cache)
});

module.exports = { rootRouter: router };
