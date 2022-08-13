const bcrypt = require("bcryptjs");

/**
 * Check if password is correct
 */
module.exports = function (password) {
  return bcrypt.compare(password, this.password);
};
