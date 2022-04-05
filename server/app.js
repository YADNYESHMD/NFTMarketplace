const express = require("express");
//const cors =require('cors');
const mongoose = require("mongoose");
const User = require("./model/userSchema");
const allNFT = require("./model/nft");
const allToken = require("./model/tokenSchema");
const nftcollection = require("./model/collection");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/NFT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  //console.log(req.body);
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all details" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      //window.alert("User already exist");
      console.log("User already exist");
      return res.status(422).json({ error: "User already exist" });
    }
    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ message: `You have logged in successfully` });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(422).json({ error: "Fill all details" });
    }
    const userEmail = await User.findOne({ email: email });
    const userPassword = await User.findOne({ password: password });
    console.log(userEmail, userPassword);

    if (!userEmail || !userPassword) {
      //console.log("Hello from invalid");
      res.json({ error: "Invalid credentials" });
    } else {
      res.json({ message: "User Signin Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/transfer", async (req, res) => {
  console.log(req.body);
  try {
    const { mytoken, receiver_address } = req.body;
    const tokens = new allToken({ mytoken, receiver_address });

    await tokens.save();
    res.json({ message: "token added" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/recieve", async (req, res) => {
  console.log(req.body);
  try {
    const myReceiver_address = await allToken.find({
      receiver_address: req.body.receiver_address,
    });
    res.status(201).json(myReceiver_address);
    //
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/accept", async (req, res) => {
  console.log(req.body);
  try {
    allToken.deleteOne(
      { receiver_address: req.body.receiver_address },
      function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
      }
    );

    //res.status(201).json(myReceiver_address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post("/mint", async (req, res) => {
  console.log(req.body.collection);
  const { collectionName } = req.body;
  //console.log(req.body);

  try {
    // const collectionExist = await nftcollection.find({ myCollection:collectionName });
    // console.log(collectionExist)
    // if (collectionExist) {
    //   console.log("Token already exist");
    // }
  
    const collect = new nftcollection({collectionName} );
    await collect.save();
    

    res.status(201).json({ message: `You have created nft in successfully` });
  } catch (err) {
    console.log(err);
  }
});


app.listen(8000, () => {
  console.log("Database started at port 5000");
});
