const express = require("express");
const router = express.Router();

const user = require("./user");
const authentication = require("./authentication");

router.use("/user", user);
router.use("/authentication", authentication);

module.exports = router;
