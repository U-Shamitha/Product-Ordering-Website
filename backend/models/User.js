const mongoose = require('mongoose');

const User = mongoose.model("User", {
    email: String,
    phone: String,
    name: {type: String, require: true},
    profileImage: {type: String, require: true, default:""},
    password: {type: String, require: true},
    role: { type: String, require: true, enum: ["Admin", "User"], default: "User" },
  });

module.exports = {User};