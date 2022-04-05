const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

//const jwt = require("jsonwebtoken");
const tokenSchema = new mongoose.Schema({
  mytoken: {
    type: Object,
    required: true,
  },
  receiver_address: {
    type: String,
    required: true,
  },
});

const allToken = mongoose.model("Token", tokenSchema);
module.exports = allToken;
