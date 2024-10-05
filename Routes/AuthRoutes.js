const express = require("express")
const router = express.Router()
const { buyerSignup,buyerLogin} = require("../Controllers/Auth")

router.post("/signUp/buyer", buyerSignup)
router.post("/login/buyer", buyerLogin)

module.exports = router