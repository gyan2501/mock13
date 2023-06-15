const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../model/User.Model");

const userRouter = express.Router();

// register user
userRouter.post("/register", async (req, res) => {
  const { email, password, username, avatar } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, username, avatar });
      await user.save();
      res.status(200).send({ msg: "New User has been registered!!" });
    });
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

// login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ err: err.message });
        } else if (result) {
          const token = jwt.sign({ userId: user._id, username:user.username }, "masai");
          res.status(200).send({ msg: "Login Successfull..", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
