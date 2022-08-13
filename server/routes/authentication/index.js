const express = require("express");
const router = express.Router();

const { auth } = require("../../middleware");

const post = require("./post");
const get = require("./get");

// Login user route
router.post("/", post);
router.get("/", auth, get);

module.exports = router;
