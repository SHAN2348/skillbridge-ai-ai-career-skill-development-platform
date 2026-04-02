const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided ❌"
    });
  }

  // ✅ FIX: remove "Bearer " if present
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    req.user = verified; // contains id and role

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token ❌"
    });
  }
};