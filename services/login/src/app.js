// src/app.js

import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.routes.js";
import mongoose from "mongoose";
import config from "../config.js";
import bodyParser from "body-parser";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.db_uri, {});
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const app = express();

app.use(cors());

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

await connectToDB();

export default app;
