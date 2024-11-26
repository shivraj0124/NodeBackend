const mongoose = require('mongoose');

// Define the schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_num: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
});

// Export the model directly
module.exports = mongoose.model('Buyer', userSchema);
