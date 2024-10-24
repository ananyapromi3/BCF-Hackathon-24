// src/routes/Booking.Routes.js
import express from "express";
import { bookTicket } from "../controllers/Booking.Controller.js";

const router = express.Router();

router.post("/book", bookTicket);

export default router;
