// src/models/Train.js
import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  train_name: { type: String, required: true },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  date: { type: String, required: true }, // New date field (format: 'YYYY-MM-DD')
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },
  cabins: [
    {
      cabin_type: { type: String, required: true },
      fare: { type: Number, required: true },
      total_seats: { type: Number, required: true },
      seats: [
        {
          seat_number: { type: String, required: true },
          is_booked: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

// Named export
export const Train = mongoose.model("Train", trainSchema);
