const User = require("../Models/BuyerModel");
const SellerModel = require("../Models/SellerModel");
const ProductModel = require("../Models/ProductModel")
const getAllSellers = async (req, res) => {
  const { token } = req.body;
  try {
    if (token && token === "VJTI") {
      const unVerSellers = await SellerModel.find({ isVerified: false },{password:0});
      const verSellers = await SellerModel.find({ isVerified: true },{password:0});
      res.send({
        success: true,
        unverified: unVerSellers,
        verified: verSellers,
      });
    } else {
      res.send({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const updateSellerStatus = async (req, res) => {
  const { token,sellerId } = req.body;
  try {
    if (token && token === "VJTI") {
      const seller = await SellerModel.findByIdAndUpdate(sellerId,{ isVerified: true },{new:true});

      res.send({
        success: true,
        message:"Seller Verified"
      });
    } else {
      res.send({
        success: false,message:"Invalid Token"
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const deleteSeller =async(req,res)=>{
  const {sellerId,token}=req.body
  try {
    if (token && token === "VJTI") {
        const deletedSeller = await SellerModel.findByIdAndDelete(sellerId);

      res.send({
        success: true,
        message:"Seller deleted"
      });
    } else {
      res.send({
        success: false,message:"Invalid Token"
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
}

const getStats = async(req,res)=>{
    try{
        const sellerCount = await SellerModel.countDocuments();
        const buyerCount = await User.countDocuments();
        const productCount = await ProductModel.countDocuments();
        res.send({
            success:true,
            sellerCount,
            productCount,
            buyerCount
        })
    }catch(err){
        res.send({ message: err.message });
    }
}

module.exports = {
  getAllSellers,
  updateSellerStatus,
  deleteSeller,
  getStats
};
