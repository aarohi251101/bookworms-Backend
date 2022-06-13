const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  avatar : String,
  isAdmin:Boolean,
  createdAt: { type: Date, default: new Date() },
});

const userModel = mongoose.model("user", mySchema);

module.exports = userModel;