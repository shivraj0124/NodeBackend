const express = require("express");
const cors = require("cors"); // Optional: For enabling CORS
const bodyParser = require("body-parser"); // Optional: For parsing JSON bodies
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI;
console.log(MONGO_URL);

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

const authRoutes = require("./Routes/AuthRoutes");
const sellerRoutes = require("./Routes/SellerRoutes");
const adminRoutes = require("./Routes/AdminRoutes");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB not connected", err);
    process.exit(1); // Exit process with failure
  }
};
connectDB();
// Start the Server

app.use("/auth",authRoutes)
app.use("/seller",sellerRoutes)
app.use("/admin",adminRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
