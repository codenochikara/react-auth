const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // Bearer token

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

  const token = authHeader.split(' ')[1]; // Separate token from Bearer token

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden
    // if (err) return res.status(403).json({ message: "Forbidden" }); // Forbidden

    // Decode the token and attach user information to the request object
    req.username = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
}

module.exports = verifyJWT;
