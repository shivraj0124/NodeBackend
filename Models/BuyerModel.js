const  mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{type: String,required: true},
    name: {type: String,required: true},
    password: {type: String,required: true},
    phone_num: {type: String,required: true},
    address: String
  });
  
  // Create the model
  const User = mongoose.model('Buyer', userSchema);
  
  module.exports = User;