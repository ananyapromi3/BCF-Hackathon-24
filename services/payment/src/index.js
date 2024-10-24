// src/index.js
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
