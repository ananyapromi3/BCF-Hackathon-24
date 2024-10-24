// src/routes/auth.routes.js

import express from "express";
import authController from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
