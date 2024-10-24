// src/index.js
import dotenv from "dotenv";
import app from "./app.js";
// import config from "../config.js";

// Load environment variables from .env file
// dotenv.config();

const PORT = 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
