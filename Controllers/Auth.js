const express = require("express");
const User = require("../Models/BuyerModel");
const SellerModel = require("../Models/SellerModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const buyerSignup = async (req, res) => {
  try {
    const { name, password, address, phone_num, email } = req.body;
    console.log(email);

    const emailExist = await User.findOne({ email });
    console.log(emailExist === null);
    if (emailExist !== null) {
      return res.send({success:false, message: "Email already exist" });
    }
    const phone_numExist = await User.findOne({ phone_num });
    if (phone_numExist) {
      return res.send({success:false, message: "Mobile No. exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_num,
      address,
    });
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
  } catch (err) {
    res.send({ message: err.message });
  }
};

const buyerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({success:false, message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({success:false, message: "Invalid email or password" });
    }
    return res.send({
        success:true,
      message: "User Logged in successful!",
      token: generateToken(user._id),
    });
  } catch (err) {
    res.send({success:false, message: err.message });
  }
};

const SellerSignup = async (req, res) => {
  try {
    const {
      name,
      password,
      address,
      phoneNum,
      email,
      storeName,
      storeDescription,
      storeAddress,
      instagramUrl,
      facebookUrl,
      businessHrs,
      profilePhoto,
      storePhoto,

    } = req.body;
    console.log(email);

    const emailExist = await SellerModel.findOne({ email });
    console.log(emailExist === null);
    if (emailExist !== null) {
      return res.send({success:false, message: "Email already exist" });
    }
    const phone_numExist = await SellerModel.findOne({ phoneNum });
    if (phone_numExist) {
      return res.send({success:false, message: "Mobile No. exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await SellerModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNum,
      address,
      storeName,
      storeDescription,
      storeAddress,
      instagramUrl,
      facebookUrl,
      businessHrs,
      profilePhoto,
      storePhoto,
    });
    if (newUser) {
      return res.send({
        success: true,
        newUser,
        message: "Seller Registered Successfully.",
      });
    } else {
      return res.send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const sellerLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await SellerModel.findOne({ email });
      if (!user) {
        return res.send({success:false, message: "Invalid email or password" });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send({success:false, message: "Invalid email or password" });
      }
      return res.send({
        success:true,
        message: "Seller Logged in successful!",
        token: generateToken(user._id),
      });
    } catch (err) {
      res.send({success:false, message: err.message });
    }
  };
module.exports = {
  buyerSignup,
  buyerLogin,
  SellerSignup,
  sellerLogin
};
