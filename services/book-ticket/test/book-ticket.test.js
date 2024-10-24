import { Booking } from "../src/models/Booking.js";
import { Train } from "../src/models/Train.js";
import { bookTicket } from "../src/controllers/Booking.Controller.js";

// Mock the Mongoose model methods
jest.mock("../src/models/Train.js");
jest.mock("../src/models/Booking.js");

describe("Booking Controller", () => {
  describe("bookTicket", () => {
    it("should book a ticket successfully", async () => {
      const req = {
        body: {
          user_id: "someUserId",
          train_id: "trainId",
          cabin_type: "AC",
          seat_number: "A1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.findById to return a sample train
      Train.findById.mockResolvedValue({
        _id: "trainId",
        cabins: [
          {
            cabin_type: "AC",
            seats: [
              { seat_number: "A1", is_booked: false },
              { seat_number: "A2", is_booked: false },
            ],
          },
        ],
        save: jest.fn(), // Mock save method
      });

      // Mock Booking.save to simulate a successful booking
      Booking.prototype.save = jest.fn().mockResolvedValue();

      await bookTicket(req, res);

      expect(Train.findById).toHaveBeenCalledWith("trainId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ticket booked successfully",
      });
    });

    it("should return 404 if train not found", async () => {
      const req = {
        body: {
          user_id: "someUserId",
          train_id: "nonExistentId",
          cabin_type: "AC",
          seat_number: "A1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.findById to return null
      Train.findById.mockResolvedValue(null);

      await bookTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Train not found" });
    });

    it("should return 404 if cabin not found", async () => {
      const req = {
        body: {
          user_id: "someUserId",
          train_id: "trainId",
          cabin_type: "Sleeper",
          seat_number: "A1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.findById to return a train without the specified cabin
      Train.findById.mockResolvedValue({
        _id: "trainId",
        cabins: [
          {
            cabin_type: "AC",
            seats: [{ seat_number: "A1", is_booked: false }],
          },
        ],
      });

      await bookTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Cabin not found" });
    });

    it("should return 404 if seat not found", async () => {
      const req = {
        body: {
          user_id: "someUserId",
          train_id: "trainId",
          cabin_type: "AC",
          seat_number: "A3",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.findById to return a train without the specified seat
      Train.findById.mockResolvedValue({
        _id: "trainId",
        cabins: [
          {
            cabin_type: "AC",
            seats: [{ seat_number: "A1", is_booked: false }],
          },
        ],
      });

      await bookTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Seat not found" });
    });

    it("should return 400 if the seat is already booked", async () => {
      const req = {
        body: {
          user_id: "someUserId",
          train_id: "trainId",
          cabin_type: "AC",
          seat_number: "A1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.findById to return a train with the seat booked
      Train.findById.mockResolvedValue({
        _id: "trainId",
        cabins: [
          {
            cabin_type: "AC",
            seats: [{ seat_number: "A1", is_booked: true }],
          },
        ],
      });

      await bookTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Seat is already booked",
      });
    });
  });
});
