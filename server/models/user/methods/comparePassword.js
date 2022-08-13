const bcrypt = require("bcryptjs");

/**
 * Check if password is correct
 */
module.exports = async function (password) {
  return await bcrypt.compare(password, this.password);
};
