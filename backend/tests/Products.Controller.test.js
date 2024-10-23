// tests/Products.Controller.test.js

// import productsController from "../src/controllers/Products.Controller.js";
const productsController =
  require("../src/controllers/Products.Controller.js").default;
// import Product from "../src/models/Product.js";
const Product = require("../src/models/Product.js").default;

// Mock the Mongoose model methods
jest.mock("../src/models/Product.js");

describe("Products Controller", () => {
  // Test the index method
  describe("index", () => {
    it("should return a list of products", async () => {
      const mockProducts = [
        { title: "Product 1", description: "Description 1", price: "10" },
        { title: "Product 2", description: "Description 2", price: "20" },
      ];
      Product.find.mockResolvedValue(mockProducts);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await productsController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        data: mockProducts,
      });
    });

    it("should return 500 if there is an error", async () => {
      Product.find.mockRejectedValue(new Error("DB Error"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await productsController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: new Error("DB Error"),
      });
    });
  });

  // Test the save method
  describe("save", () => {
    it("should save a new product", async () => {
      const req = {
        body: { title: "Product 1", description: "Description 1", price: "10" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSave = jest.fn().mockResolvedValue({});
      Product.mockImplementation(() => ({ save: mockSave }));

      await productsController.save(req, res);

      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should return 500 if there is an error", async () => {
      const req = {
        body: { title: "Product 1", description: "Description 1", price: "10" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSave = jest.fn().mockRejectedValue(new Error("DB Error"));
      Product.mockImplementation(() => ({ save: mockSave }));

      await productsController.save(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: new Error("DB Error"),
      });
    });
  });
});
