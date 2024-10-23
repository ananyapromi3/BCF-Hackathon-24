// dockerlearn-ui/src/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Fetch products from the backend
  getProducts() {
    return apiClient.get("/products");
  },

  // Add a product
  addProduct(product) {
    return apiClient.post("/products", product);
  },
};
