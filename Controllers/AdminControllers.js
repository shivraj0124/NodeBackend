const User = require("../Models/BuyerModel");
const SellerModel = require("../Models/SellerModel");

const getAllSellers = async (req, res) => {
  const { token } = req.body;
  try {
    if (token && token === "VJTI") {
      const unverSellers = await SellerModel.find({ isVerified: false });
      const verSellers = await SellerModel.find({ isVerified: true });
      res.send({
        success: true,
        unverified: unversellers,
        verified: versellers,
      });
    } else {
      res.send({
        success: false,
        data: sellers,
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const updateSellerStatus = async (req, res) => {
  const { token } = req.body;
  try {
    if (token && token === "VJTI") {
      const seller = await SellerModel.find();
      res.send({
        success: true,
        unverified: unversellers,
        verified: versellers,
      });
    } else {
      res.send({
        success: false,
        data: sellers,
      });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

module.exports = {
  getAllSellers,
  updateSellerStatus,
};
