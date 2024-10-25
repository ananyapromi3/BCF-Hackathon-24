// src/services/email.service.js
import nodemailer from "nodemailer";
import dotenv, { config } from "dotenv";
// import config from "../config.js";

dotenv.config(); // Load environment variables from .env file

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "kakashihatake159211", // Use environment variable
    pass: "hqda xqeh qihs ddvq", // Use environment variable
  },
});

// Function to send email
export const sendOTP = async (toEmail, otp) => {
  const mailOptions = {
    from: "kakashihatake159211", // Use your email from environment variable
    to: toEmail, // Use the parameter passed to the function
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  console.log("Sending OTP to:", toEmail);
  console.log("From Email:", "kakashihatake159211");
  console.log("OTP: ", otp);

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};
