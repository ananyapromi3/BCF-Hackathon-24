// config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3003
};

export default config;