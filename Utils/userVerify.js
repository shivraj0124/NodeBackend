const jwt = require("jsonwebtoken");
const User = require("../Models/BuyerModel")
const protect2 = async (req, res, next) => {
    console.log(req.headers.authorization);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.userId).select("-password");
        console.log(req.user);
        
        next();
      } catch (err) {
        res.send({success:false, msg: "Not authorized" });
      }
    }
    if(!token){
      res.send({success:false, msg: "Not authorized , No Token" });
    }
  };

module.exports = protect2;