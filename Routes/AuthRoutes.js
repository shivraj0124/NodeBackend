const express = require("express")
const router = express.Router()
const { buyerSignup,buyerLogin,SellerSignup,sellerLogin} = require("../Controllers/Auth")

router.post("/signUp/buyer", buyerSignup)
router.post("/login/buyer", buyerLogin)
router.post("/signup/seller", SellerSignup)
router.post("/login/seller", sellerLogin)

module.exports = router