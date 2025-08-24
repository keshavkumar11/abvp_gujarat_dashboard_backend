import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import User from "./src/models/User.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      username: "admin",
      password: "admin123", // will be hashed automatically
    });

    console.log("Admin created:", admin);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
