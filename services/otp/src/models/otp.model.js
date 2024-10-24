//otp/src/models/otp.model.js

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // 5 minutes expiration
});

export const OTP = mongoose.model('OTP', otpSchema);