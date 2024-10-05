const express = require("express");
const router = express.Router();
const protect = require("../Utils/authMiddleware");

const { addProduct } = require("../Controllers/SellerController");

// Protect this route with the 'protect' middleware
router.post("/addProduct", protect, addProduct);

module.exports = router;
