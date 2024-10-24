import express from "express";
import mongoose from "mongoose";
import bookingRoutes from "./routes/Booking.Routes.js";
import config from "../config.js";

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(
  "mongodb+srv://ananyapromi3:promi3@train.7ag3z.mongodb.net/?retryWrites=true&w=majority&appName=Train/train",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes
app.use("/api/booking", bookingRoutes);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
