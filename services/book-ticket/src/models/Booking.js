// src/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  train_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  cabin_type: { type: String, required: true },
  fare: { type: Number, required: true },
  seat_number: { type: String, required: true },
  booked_at: { type: Date, default: Date.now },
});

export const Booking = mongoose.model("Booking", bookingSchema);
