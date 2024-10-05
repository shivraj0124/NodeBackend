const express = require("express");
const router = express.Router();
const protect2 = require("../Utils/userVerify")

const {addProductReview,getProductsByCategory,getAllProducts,getSignleProduct} = require("../Controllers/UserControllers")

router.post("/addProductReview",protect2,addProductReview)
router.post("/getProductsByCategory",getProductsByCategory)
router.post("/getAllProducts",getAllProducts)
router.post("/getSignleProduct",getSignleProduct)

module.exports = router;