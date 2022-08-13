const express = require("express");
const router = express.Router();

const post = require("./post");

// Register new user
router.post("/", post);

module.exports = router;
