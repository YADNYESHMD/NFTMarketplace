const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

//const jwt = require("jsonwebtoken");
const collectionSchema = new mongoose.Schema({
  myCollection: {
    type: String,
    required: true,
  }
});

const nftcollection = mongoose.model("collection", collectionSchema);
module.exports = nftcollection;
