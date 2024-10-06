const express = require("express");
const router = express.Router();
const protect = require("../Utils/authMiddleware");

const { addProduct,getProductsBySeller,getSellerInfo } = require("../Controllers/SellerController");

// Protect this route with the 'protect' middleware
router.post("/addProduct", protect, addProduct);
router.post("/getProductsBySeller", getProductsBySeller);
router.post("/getSellerInfo", getSellerInfo);

module.exports = router;
