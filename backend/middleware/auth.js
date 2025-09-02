const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json('No token, authorization denied.');
  }

  // Expect format: "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('No token, authorization denied.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach payload (id, username, etc.) to req.user
    next();
  } catch (err) {
    res.status(401).json('Token is not valid.');
  }
}

module.exports = auth;

