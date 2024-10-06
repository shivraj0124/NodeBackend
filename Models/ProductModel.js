mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type:String,
      required: true,
    },
    discount: { type: String },
    ratings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    images: { type: String, required: true },
    likes: Number,
    sellerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product",productSchema)
module.exports = Product;
