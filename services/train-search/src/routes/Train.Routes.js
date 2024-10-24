import express from "express";
import { searchTrains, getTrains } from "../controllers/Train.Controller.js"; // Update to ES6

const router = express.Router();

// Search for trains based on from, to, and date
router.post("/search", searchTrains);
router.get("/show/:trainId", getTrains);
// router.post("/cancel-seat/", cancelSeat);

export default router; // Use ES6 export
