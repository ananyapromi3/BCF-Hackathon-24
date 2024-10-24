// src/app.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payment.routes.js';
import config from '../config.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
const uri = config.db_uri;
console.log("URI is: ",uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use Payment Routes
app.use('/api/payments', paymentRoutes);

export default app;
