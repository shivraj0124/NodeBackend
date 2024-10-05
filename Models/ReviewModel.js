mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    buyerId:{ type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
    review:String
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review;
