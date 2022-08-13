const jwt = require("jsonwebtoken");

/**
 * jwt token for user
 */
module.exports = function () {
  const data = {
    _id: this._id,
  };

  return jwt.sign(data, process.env["JWT_SECRET"]);
};
