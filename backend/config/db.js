import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    const uri = config.MONGODB_URI;
    const res = await mongoose.connect(uri);
    console.log("MongoDB connected with host : ", res.connection.host);
  } catch (error) {
    console.log("Error in MongoDB connection : ", error?.message);
  }
};

export { connectDB };
