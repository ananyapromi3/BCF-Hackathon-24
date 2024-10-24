// config.js

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const config = {
  app_name: process.env["APP_NAME"],
  port: process.env["PORT"] ?? 3001,
  db_uri:
    process.env["DB_URI"] ??
    "mongodb+srv://ananyapromi3:promi3@train.7ag3z.mongodb.net/?retryWrites=true&w=majority&appName=Train/train",
  db_options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default config;
