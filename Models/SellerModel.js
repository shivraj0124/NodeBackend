const  mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    email:{type: String,required: true},
    name: {type: String,required: true},
    password: {type: String,required: true},
    phoneNum: {type: String,required: true},
    address: String,
    storeName: {type: String,required: true},
    storeDescription: {type: String,required: true},
    storeAddress: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    OverallRating: {type:Number,default:0}, 
    instagramUrl:String,
    facebookUrl:String,
    businessHrs:String,
    profilePhoto:String,
    storePhoto:String,
    transactionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isVerified: {
        type: Boolean,
        default: false
      }
  },
  {
    timestamps: true,
  });
  
  // Create the model
  const Seller = mongoose.model('Seller', sellerSchema);
  
  module.exports = Seller;