const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('Middleware token', token);
  // Check if no token
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' })
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.error(error);
      res.status(401).json({ error: 'Token is not valid'})
    };
    console.log(decoded);
    req.id = decoded._id;
    next();
  });
};