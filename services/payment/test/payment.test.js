import { processPayment, getPaymentStatus } from "../src/controllers/payment.controller.js";
import { Payment } from "../src/models/payment.model.js";
import mongoose from 'mongoose';
import crypto from 'crypto';

// Mock Mongoose model methods
jest.mock("../src/models/payment.model.js");

// Mock crypto.randomBytes to return a fixed transaction ID
jest.spyOn(crypto, 'randomBytes').mockReturnValue(Buffer.from('mocktransactionid'));

// Helper function to mock Express req and res
const mockRequest = (body = {}, params = {}) => ({ body, params });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("Payment Controller", () => {

  describe("processPayment", () => {
    it("should process a successful payment", async () => {
      const req = mockRequest({
        bookingId: new mongoose.Types.ObjectId(),  // Use new keyword to create ObjectId
        userId: new mongoose.Types.ObjectId(),     // Use new keyword to create ObjectId
        amount: 500,
        paymentMethod: "Credit Card"
      });
      const res = mockResponse();

      // Mock the save method and ensure transactionId and status are correct
      Payment.prototype.save = jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        bookingId: req.body.bookingId,
        userId: req.body.userId,
        amount: req.body.amount,
        paymentMethod: req.body.paymentMethod,
        // status: 'Success',
        transactionId: '6d6f636b7472616e73616374696f6e6964'  // Mock transactionId in hex format
      });

      // Simulate a payment success scenario (90% chance)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.9);

      await processPayment(req, res);

      expect(Payment.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment Successful",
        transactionId: '6d6f636b7472616e73616374696f6e6964', // Hex-encoded transactionId
        // status: 'Success'
      });
    });

    it("should process a failed payment", async () => {
      const req = mockRequest({
        bookingId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        amount: 500,
        paymentMethod: "Credit Card"
      });
      const res = mockResponse();

      // Mock the save method and ensure transactionId and status are correct
      Payment.prototype.save = jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        bookingId: req.body.bookingId,
        userId: req.body.userId,
        amount: req.body.amount,
        paymentMethod: req.body.paymentMethod,
        // status: 'Failure',
        transactionId: '6d6f636b7472616e73616374696f6e6964'  // Mock transactionId in hex format
      });

      // Simulate a payment failure scenario (10% chance)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.05);

      await processPayment(req, res);

      expect(Payment.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment Failed",
        transactionId: '6d6f636b7472616e73616374696f6e6964', // Hex-encoded transactionId
        // status: 'Failure'
      });
    });
  });

  describe("getPaymentStatus", () => {
    it("should return payment details for a valid transaction ID", async () => {
      const req = mockRequest({}, { transactionId: 'mocktransactionid' });
      const res = mockResponse();

      Payment.findOne = jest.fn().mockResolvedValue({
        transactionId: 'mocktransactionid',
        // status: 'Success',
        amount: 500,
        paymentMethod: 'Credit Card',
        createdAt: new Date()
      });

      await getPaymentStatus(req, res);

      expect(Payment.findOne).toHaveBeenCalledWith({ transactionId: 'mocktransactionid' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        transactionId: 'mocktransactionid',
        // status: 'Success',
        amount: 500,
        paymentMethod: 'Credit Card',
        createdAt: expect.any(Date)
      });
    });

    it("should return 404 for an invalid transaction ID", async () => {
      const req = mockRequest({}, { transactionId: 'invalidtransactionid' });
      const res = mockResponse();

      Payment.findOne = jest.fn().mockResolvedValue(null);

      await getPaymentStatus(req, res);

      expect(Payment.findOne).toHaveBeenCalledWith({ transactionId: 'invalidtransactionid' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Transaction not found'
      });
    });
  });
});
