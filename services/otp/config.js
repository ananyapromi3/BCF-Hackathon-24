// config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3003,
  db_options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default config;

// config.js

// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config();

// const config = {
//   app_name: process.env["APP_NAME"],
//   port: process.env["PORT"] ?? 3004,
//   db_uri:
//     process.env["DB_URI"] ??
//     "mongodb+srv://ananyapromi3:promi3@train.7ag3z.mongodb.net/?retryWrites=true&w=majority&appName=Train",
  
// };

// export default config;
