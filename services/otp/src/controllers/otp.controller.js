//src/controllers/otp.controller.js

import { OTP } from '../models/otp.model.js';
import { sendOTP } from '../services/email.service.js';
import crypto from 'crypto';

// Generate OTP and Send to Email
export const generateOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save the OTP to the database with email and expiration time
    const otpEntry = new OTP({ email, otp });
    await otpEntry.save();

    // Send the OTP via email
    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent to email successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating OTP', error });
  }
};

// Validate OTP
export const validateOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP entry in the database
    const otpEntry = await OTP.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid, remove it from the database
    await OTP.deleteOne({ _id: otpEntry._id });

    res.status(200).json({ message: 'OTP is valid' });
  } catch (error) {
    res.status(500).json({ message: 'Error validating OTP', error });
  }
};
