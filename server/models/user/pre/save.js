const bcrypt = require("bcryptjs");

/**
 * Hash password before save
 */
module.exports = async function (next) {
  const user = this;

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Generate hash from salt
    const hash = await bcrypt.hash(user.password, salt);
    // Save hash as password
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
};
