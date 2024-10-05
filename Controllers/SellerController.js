const express = require("express")
const ProductModel = require("../Models/ProductModel")
const SellerModel = require("../Models/SellerModel")
const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    discount,
    images,
    sellerId
  } = req.body;
  console.log(
    name,
    description,
    price,
    category,
    discount,
    images,
  );

  try {
    // Create new product
    const newProduct = new ProductModel({
        name,
        description,
        price,
        category,
        discount,
        images,
        sellerId:req.user._id
    });
    await newProduct.save();
    console.log(req.user._id,"new Product", newProduct);
    
    // Find the seller by ID
    const getSeller = await SellerModel.findById(req.user._id);
    if (!getSeller) {
      return res.send({ success: false, message: "Seller not found" });
    }
    console.log("getSeller :: ", getSeller);

    // Update seller's products array
    getSeller.products.push(newProduct._id);
    await getSeller.save();

 
    res.send({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  addProduct
}
