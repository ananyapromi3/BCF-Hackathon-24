// src/controllers/payment.controller.js
import { Payment } from '../models/payment.model.js';
import crypto from 'crypto';

// Controller to process mock payment
export const processPayment = async (req, res) => {
  const { bookingId, userId, amount, paymentMethod } = req.body;

  try {
    // Mock processing delay (simulate real-world payment gateway processing)
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

    // Randomly determine if payment is successful or failed
    const isSuccess = Math.random() > 0.1; // 90% success rate

    // Generate a mock transaction ID
    const transactionId = crypto.randomBytes(16).toString('hex');

    // Save payment record in the database
    const payment = new Payment({
      bookingId,
      userId,
      amount,
      paymentMethod,
      status: isSuccess ? 'Success' : 'Failure',
      transactionId
    });

    await payment.save();

    // Respond with the payment status
    res.status(200).json({
      message: isSuccess ? 'Payment Successful' : 'Payment Failed',
      transactionId,
      status: payment.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};

// Controller to get payment status by transaction ID
export const getPaymentStatus = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Retrieve payment record from the database
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Respond with the payment details
    res.status(200).json({
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      createdAt: payment.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment status', error });
  }
};
