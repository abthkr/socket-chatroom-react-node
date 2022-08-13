const mongoose = require("mongoose");
const userSchema = require("./schema");
const methods = require("./methods");
const pre = require("./pre");

// Pre-Save
userSchema.pre("save", pre.save);

// Methods
Object.assign(userSchema.methods, methods);

module.exports = mongoose.model("user", userSchema);
