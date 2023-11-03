const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/authConfig");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  console.log("tokenInRequest: ",token);
  console.log(req.userId);
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authMiddleware;
