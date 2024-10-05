const express = require("express");
const router = express.Router();
const { getAllSellers, updateSellerStatus } = require("../Controllers/AdminControllers");

router.post("/getAllSellers", getAllSellers);
router.post("/updateSellerStatus", updateSellerStatus);

module.exports = router;
