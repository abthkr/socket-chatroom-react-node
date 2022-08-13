/**
 * Get user details
 */

const User = require("../../models/user");

module.exports = async function (req, res) {
  try {
    const user = await User.findOne(
      { _id: req.user._id },
      "-password -__v -createdAt -updatedAt"
    );

    return res.json(user);
  } catch (error) {
    console.error("Error in getting user details", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in getting user details" });
  }
};
