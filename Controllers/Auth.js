const express = require("express");
const User = require("../Models/BuyerModel")
const bcrypt = require("bcryptjs");

const buyerSignup = async (req, res) => {
  try {
    const {name,password,address,phone_num,email} = req.body
    console.log(email);
    
    const emailExist = await User.findOne({ email });
    console.log(emailExist === null)
    if (emailExist !== null){
      return res.send({ message: "Email already exist" });
    }
    const phone_numExist = await User.findOne({ phone_num });
    if (phone_numExist) {
      return res.send({ message: "Email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password:hashedPassword, phone_num,address });
    if (newUser) {
      return res.send({
        success: true,
        newUser,
        message: "User Registered Successfully.",
        // token: generateToken(user._id),
      });
    } else {
      return res.send({
        success: false,
        message: "Something went wrong",
      });
    }

    res.send({
      message: "Signup successful",
    });
  } catch (err) {
    res.send({ message: err.message });
  }
};

const buyerLogin = async (req, res) => {
    try {
      const {username,password} = req.body
      const user = await User.findOne({ username });
    if (!user) {
      return res.send({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ message: "Invalid username or password" });
    }
    } catch (err) {
      res.send({ message: err.message });
    }
  };

module.exports = {
    buyerSignup,
    buyerLogin
}
