import { OTP } from "../src/models/otp.model.js";
import { generateOTP, validateOTP } from "../src/controllers/otp.controller.js";
import { sendOTP } from "../src/services/email.service.js";

// Mock the Mongoose model methods and email service
jest.mock("../src/models/otp.model.js");
jest.mock("../src/services/email.service.js");

describe("OTP Controller", () => {
  describe("generateOTP", () => {
    it("should generate an OTP and send it via email", async () => {
      const req = {
        body: { email: "test@example.com" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the OTP.save method
      OTP.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true),
      }));

      // Mock the sendOTP function
      sendOTP.mockResolvedValue(true);

      await generateOTP(req, res);

      expect(OTP).toHaveBeenCalled();
      expect(sendOTP).toHaveBeenCalledWith(req.body.email, expect.any(String)); // Check if the sendOTP function was called with the correct email and any OTP
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "OTP sent to email successfully.",
      });
    });

    it("should return 500 if there is an error generating OTP", async () => {
      const req = {
        body: { email: "test@example.com" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the OTP.save method to throw an error
      OTP.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("DB Error")),
      }));

      await generateOTP(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error generating OTP",
        error: expect.any(Error),
      });
    });
  });

  describe("validateOTP", () => {
    it("should validate a correct OTP", async () => {
      const req = {
        body: { email: "test@example.com", otp: "123456" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the OTP.findOne method to return a valid OTP
      OTP.findOne.mockResolvedValue({
        _id: "123",
        email: "test@example.com",
        otp: "123456",
      });

      await validateOTP(req, res);

      expect(OTP.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
        otp: "123456",
      });
      expect(OTP.deleteOne).toHaveBeenCalledWith({ _id: "123" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "OTP is valid" });
    });

    it("should return 400 if the OTP is invalid", async () => {
      const req = {
        body: { email: "test@example.com", otp: "wrong-otp" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the OTP.findOne method to return null
      OTP.findOne.mockResolvedValue(null);

      await validateOTP(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid or expired OTP",
      });
    });

    it("should return 500 if there is a server error", async () => {
      const req = {
        body: { email: "test@example.com", otp: "123456" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the OTP.findOne method to throw an error
      OTP.findOne.mockRejectedValue(new Error("DB Error"));

      await validateOTP(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error validating OTP",
        error: expect.any(Error),
      });
    });
  });
});
