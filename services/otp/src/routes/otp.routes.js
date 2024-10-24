// otp/src/models/otp.routes.js

import express from 'express';
import { generateOTP, validateOTP } from '../controllers/otp.controller.js';

const router = express.Router();

// POST endpoint to generate and send OTP
router.post('/generate', generateOTP);

// POST endpoint to validate OTP
router.post('/validate', validateOTP);

export default router;
