const express = require("express")
const ProductModel = require("../Models/ProductModel")
const SellerModel = require("../Models/SellerModel")
const OpenAI = require("openai");
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

let IG_USERNAME = 'sk40fs@gmail.com';
let IG_PASSWORD = 'NewInsta@KJ';

const openai = new OpenAI({
  apiKey: "sk-proj-vfXfgqyTsgA9EX8kX7k7T3BlbkFJSNYutWNcGSZ5S1bgdCws", 
});


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

    const postToInsta = async (img, descript) => {
      console.log(img, descript);
      let message = descript + "Please create and SEO optimized Caption for Instagram post using the given description for the product";
      try {
        // Send user message to OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        });
        // Extract and send back the response from OpenAI
        caption = response.choices[0].message.content;
        console.log(caption);
        //res.json({ reply: botReply });
        const ig = new IgApiClient();
        ig.state.generateDevice(IG_USERNAME);
        await ig.account.login(IG_USERNAME, IG_PASSWORD);
    
        const imageBuffer = await get({
            url: img,
            encoding: null, 
        });
    
        await ig.publish.photo({
            file: imageBuffer,
            caption: caption,
        });}
        catch (error) {
          console.error("Error with OpenAI API:", error);
        }
    }
    postToInsta(images, description);

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

const getSellerStats=async(req,res)=>{
  try{
    
  }catch(err){
    return res.send({
      success:false,
      message:err
    })
  }
}

const getProductsBySeller=async(req,res)=>{
  try{
    const {sellerId} = req.body
    const getProduct = await ProductModel.find({sellerId:sellerId});
    
    
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

const getSellerInfo = async(req,res)=>{
  try{
    const {sellerId} = req.body
    const getSeller = await SellerModel.findById(sellerId).populate('products')            // Populate products
    .populate('reviews') 
    
    if(getSeller){
      return res.send({
        success:true,
        data:getSeller,
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
module.exports = {
  addProduct,
  getProductsBySeller,
  getSellerInfo
}
