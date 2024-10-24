import bcrypt from "bcrypt";
import authController from "../src/controllers/auth.Controller.js";
import User from "../src/models/User.js";

// Mock the Mongoose model methods and bcrypt
jest.mock("../src/models/User.js");
jest.mock("bcrypt");

describe("Auth Controller", () => {
  // Test the register method
  describe("register", () => {
    it("should register a new user successfully", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          phone: "1234567890",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock bcrypt hash and User model save
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.prototype.save = jest.fn().mockResolvedValue({});

      await authController.register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 201,
        message: "User registered successfully",
      });
    });

    it("should return error for invalid email", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "invalidEmail",
          password: "password123",
          phone: "1234567890",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email address",
      });
    });

    it("should return error for short password", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "short",
          phone: "1234567890",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password must be at least 8 characters long",
      });
    });

    it("should return error for short phone number", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          phone: "12345",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Phone number must be at least 10 characters long",
      });
    });
  });

  // Test the login method
  describe("login", () => {
    it("should log in successfully with valid credentials", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = {
        email: "test@example.com",
        password: "hashedPassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: "Login successful",
      });
    });

    it("should return 404 if user is not found", async () => {
      const req = {
        body: { email: "nonexistent@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: "User not found",
      });
    });

    it("should return 400 for invalid password", async () => {
      const req = {
        body: { email: "test@example.com", password: "wrongpassword" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = {
        email: "test@example.com",
        password: "hashedPassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "wrongpassword",
        "hashedPassword"
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Invalid password",
      });
    });

    it("should return 500 if there is an error", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockRejectedValue(new Error("DB Error"));

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "DB Error",
      });
    });
  });
});
