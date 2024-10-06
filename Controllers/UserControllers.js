const express = require("express");
const reviewModel = require("../Models/ReviewModel")
const productModel = require("../Models/ProductModel")

const addProductReview = async (req, res) => {
  try {
    const { review, productId } = req.body;
    console.log(review,"tetets",req.user._id);
    
    const newReview = new reviewModel({
      review,
      productId,
      buyerId: req.user._id,
    });
    await newReview.save();
    
    const getProduct = await productModel.findById(productId);
    
    if (!getProduct) {
      return res.send({ success: false, message: "Product not found" });
    }
    console.log("getProduct :: ", getProduct);

    // Update seller's products array
    getProduct.reviews.push(newReview._id);
    getProduct.save()

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

const getProductsByCategory = async(req,res)=>{
  try{
    const {category }= req.body
    const getProduct = await productModel.find({category:category});
    if(getProduct){
      return res.send({
        success:true,
        data:getProduct,
        message:"Data found"
      })
    }else{
      return res.send({
        success:false,
        message:"Data not found"
      })
    }
  }catch(err){
    return res.send({
      success:false,
      message:err
    })
  }
}

const getAllProducts = async(req,res)=>{
  try{
    const getProduct = await productModel.find();
    if(getProduct){
      return res.send({
        success:true,
        data:getProduct,
        message:"Data found"
      })
    }else{
      return res.send({
        success:false,
        message:"Data not found"
      })
    }
  }catch(err){
    return res.send({
      success:false,
      message:err
    })
  }
}

const getSignleProduct =async(req,res)=>{
  try{
    const {productId}=req.body
    const getProduct = await productModel.findById(productId).populate("reviews")    
    .populate("sellerId"); 
 
    if(getProduct){
      return res.send({
        success:true,
        data:getProduct,
        message:"Data found"
      })
    }else{
      return res.send({
        success:false,
        message:"Data not found"
      })
    }
  }catch(err){
    return res.send({
      success:true,
      message:"Something went wrong"
    })
  }
}
module.exports = {
  addProductReview,
  getProductsByCategory,
  getAllProducts,
  getSignleProduct
};
