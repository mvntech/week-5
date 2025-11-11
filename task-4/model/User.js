const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// user model
const User = mongoose.model("User", UserSchema);

module.exports = User;
