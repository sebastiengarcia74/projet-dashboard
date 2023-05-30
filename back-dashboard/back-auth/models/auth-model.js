const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userInfo = new Schema({
  email: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("UserInfo", userInfo);
