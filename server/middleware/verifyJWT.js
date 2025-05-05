const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Bearer token
  if (!authHeader) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1]; // Separate token from Bearer token
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = decoded.username;
    next();
  });
}

module.exports = verifyJWT;
