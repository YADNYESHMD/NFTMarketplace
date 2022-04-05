const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

//const jwt = require("jsonwebtoken");
const nftSchema = new mongoose.Schema({
  mytoken: {
    type: Object,
    required: true,
  },
  receiver_address: {
    type: String,
    required: true,
  },
});

const allNFT = mongoose.model("NewNft", nftSchema);
module.exports = allNFT;


