// train-search/test/train-search.test.js

import { Train } from "../src/models/Train.js";
import { searchTrains } from "../src/controllers/Train.Controller.js";

// Mock the Mongoose model methods
jest.mock("../src/models/Train.js");

describe("Train Search Controller", () => {
  describe("searchTrains", () => {
    it("should return trains for valid search parameters", async () => {
      const req = {
        body: {
          from: "Dhaka",
          to: "Chittagong",
          date: "2024-11-01",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.find to return a list of trains
      Train.find.mockResolvedValue([
        {
          train_name: "Subarna Express",
          route: { from: "Dhaka", to: "Chittagong" },
          date: "2024-11-01",
          cabins: [
            {
              cabin_type: "AC",
              fare: 1200,
              seats: [
                { seat_number: "A1", is_booked: false },
                { seat_number: "A2", is_booked: true },
              ],
            },
          ],
        },
      ]);

      await searchTrains(req, res);

      expect(Train.find).toHaveBeenCalledWith({
        "route.from": "Dhaka",
        "route.to": "Chittagong",
        date: "2024-11-01",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          train_name: "Subarna Express",
          route: { from: "Dhaka", to: "Chittagong" },
          date: "2024-11-01",
          cabins: [
            {
              cabin_type: "AC",
              fare: 1200,
              seats: [
                { seat_number: "A1", is_booked: false },
                { seat_number: "A2", is_booked: true },
              ],
            },
          ],
        },
      ]);
    });

    it("should return 404 if no trains are found", async () => {
      const req = {
        body: {
          from: "Dhaka",
          to: "Chittagong",
          date: "2024-11-01",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.find to return an empty array
      Train.find.mockResolvedValue([]);

      await searchTrains(req, res);

      expect(Train.find).toHaveBeenCalledWith({
        "route.from": "Dhaka",
        "route.to": "Chittagong",
        date: "2024-11-01",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "No trains found for the specified route and date.",
      });
    });

    it("should return 500 if there is a server error", async () => {
      const req = {
        body: {
          from: "Dhaka",
          to: "Chittagong",
          date: "2024-11-01",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock Train.find to throw an error
      Train.find.mockRejectedValue(new Error("DB Error"));

      await searchTrains(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "DB Error",
      });
    });

    it("should return 400 if the date is missing", async () => {
      const req = {
        body: {
          from: "Dhaka",
          to: "Chittagong",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await searchTrains(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Please provide from, to, and date.",
      });
    });
  });
});
