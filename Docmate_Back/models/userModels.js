const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "First name is require"],
  },
  lname: {
    type: String,
    required: [true, "Last name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  mobile: {
    type: String,
    required: [true, "mobile is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;