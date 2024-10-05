const jwt = require("jsonwebtoken");
const Seller = require("../Models/SellerModel");

const protect = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Seller.findById(decode.userId).select("-password");
      
      next();
    } catch (err) {
      res.send({success:false, msg: "Not authorized" });
    }
  }
  if(!token){
    res.send({success:false, msg: "Not authorized , No Token" });
  }
};

module.exports = protect;