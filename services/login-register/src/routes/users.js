// src/routes/users.js

import express from "express";
import usersController from "../controllers/Users.Controller.js";
const router = express.Router();

router.get("/", usersController.index);
router.post("/", usersController.save);
router.get("/lookup/:userId", usersController.lookup);

export default router;
