// src/controllers/Users.Controller.js

import User from "../models/User.js";

async function index(req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e,
    });
  }
}

async function save(req, res, next) {
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.email.indexOf("@") === -1) {
      throw new Error("Invalid email address");
    }
    user.password = req.body.password;
    if (req.body.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    user.phone = req.body.phone;
    if (req.body.phone.length < 10) {
      throw new Error("Phone number must be at least 10 characters long");
    }
    await user.save();

    return res.status(201).json({
      status: 201,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e,
    });
  }
}

export default {
  index: index,
  save: save,
};
