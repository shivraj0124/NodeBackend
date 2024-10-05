const express = require("express");
const reviewModel = require("../Models/ReviewModel")
const addProductReview = async (req, res) => {
  try {
    const { review, productId } = req.body;
    const newReview = new reviewModel({
      review,
      productId,
      sellerId: req.user._id,
    });
    await newReview.save();

    return res.send({
      success: true,
      message: "Product review added successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

module.exports = {
  addProductReview,
};
