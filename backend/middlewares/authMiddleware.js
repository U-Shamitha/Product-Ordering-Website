const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user information
const authenticateToken = (req, res, next) => {
    // console.log(req.headers.token)
    const token = req.header("token");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. Token not provided." });
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token." });
      req.user = user;
      next();
    });
  };

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }
    next();
  };

  module.exports = { authenticateToken, isAdmin }