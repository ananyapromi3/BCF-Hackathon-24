// src/controllers/auth.Controller.js

import User from "../models/User.js";
import bcrypt from "bcrypt";

// Registration logic
async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;

    if (!email.includes("@")) {
      throw new Error("Invalid email address");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (phone.length < 10) {
      throw new Error("Phone number must be at least 10 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e.message,
    });
  }
}

// Login logic
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        status: 400,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Login successful",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e.message,
    });
  }
}

export default {
  register,
  login,
};
