// src/routes/payment.routes.js
import express from 'express';
import { processPayment, getPaymentStatus } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to handle payment processing
router.post('/process', processPayment);

// Route to get payment status
router.get('/status/:transactionId', getPaymentStatus);

export default router;
