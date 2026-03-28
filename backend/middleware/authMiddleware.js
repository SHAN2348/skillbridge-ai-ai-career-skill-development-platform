const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.header("Authorization");

  if (!token) {
    return res.send("Access Denied. No token provided.");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.send("Invalid Token");
  }
};