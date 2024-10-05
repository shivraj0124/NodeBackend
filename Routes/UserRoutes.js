const express = require("express");
const router = express.Router();
const protect2 = require("../Utils/userVerify")

const {addProductReview} = require("../Controllers/UserControllers")

router.post("/addProductReview",protect2,addProductReview)

module.exports = router;