/**
 * Authentication middleware, check if Authentication token is present on request
 */

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env["JWT_SECRET"], (error, user) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.error("Something wrong with auth middleware", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
