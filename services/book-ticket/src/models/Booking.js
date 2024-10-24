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
  cabin_type: {
    type: String,
    required: true,
  },
  seats: [
    {
      type: String,
      required: true,
    },
  ], // Array of seat numbers
  total_fare: {
    type: Number,
    required: true,
  }, // Total fare for all booked seats
  booked_at: {
    type: Date,
    default: Date.now,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
