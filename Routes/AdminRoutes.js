const express = require("express");
const router = express.Router();
const { getAllSellers, updateSellerStatus,deleteSeller,getStats } = require("../Controllers/AdminControllers");

router.post("/getAllSellers", getAllSellers);
router.post("/updateSellerStatus", updateSellerStatus);
router.post("/deleteSeller", deleteSeller);
router.get("/getStats", getStats);

module.exports = router;
