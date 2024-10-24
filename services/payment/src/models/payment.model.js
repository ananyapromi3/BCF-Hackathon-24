// src/models/payment.model.js
import mongoose from 'mongoose';

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Booking' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failure'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Net Banking'], required: true },
  transactionId: { type: String, unique: true },  // Mock transaction ID
  createdAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', paymentSchema);
