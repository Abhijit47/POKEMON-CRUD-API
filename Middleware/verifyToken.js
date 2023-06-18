const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json({ "message": "Access Denied" });

  try {
    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(401).json({ "message": "Invalid Token" });
  }
  // next();
};