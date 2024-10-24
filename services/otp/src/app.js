//src/app.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import otpRoutes from "./routes/otp.routes.js";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const uri =
  "mongodb+srv://ananyapromi3:promi3@train.7ag3z.mongodb.net/?retryWrites=true&w=majority&appName=Train/train";
console.log("URI is: ", uri);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// Use OTP Routes
app.use("/api/otp", otpRoutes);

// Start the server
const PORT = config.dbUri || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
