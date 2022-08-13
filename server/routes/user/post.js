/**
 * Register a new user
 */

const joi = require("joi");
const User = require("../../models/user");

const bodySchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = async function (req, res) {
  try {
    const { body } = req;

    const { firstName, lastName, email, password } =
      await bodySchema.validateAsync(body, { stripUnknown: true });

    const user = await new User({
      firstName,
      lastName,
      email,
      password,
    }).save();

    const data = {
      token: user.getToken(),
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    return res.json(data);
  } catch (error) {
    console.error("Error in registering user", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in registering user" });
  }
};
