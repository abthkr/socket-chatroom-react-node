/**
 * Login user
 */

const joi = require("joi");
const User = require("../../models/user");

const bodySchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = async function (req, res) {
  try {
    const { body } = req;

    const { email, password } = await bodySchema.validateAsync(body, {
      stripUnknown: true,
    });

    const user = await User.findOne({ email });

    if (!(user && user.comparePassword(password))) {
      return res
        .status(401)
        .status({ message: "Either email or password is incorrect" });
    }

    const data = {
      token: user.getToken(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.json(data);
  } catch (error) {
    console.error("Error in user authentication", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in user authentication" });
  }
};
