import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "../config.js"; // Import config file
import trainRoutes from "./routes/Train.Routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(config.db_uri, config.db_options)
  .then(() => console.log(`${config.app_name}: MongoDB connected successfully`))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/trains", trainRoutes);

// Starting server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`${config.app_name} is running on port ${PORT}`);
});

export default app;
