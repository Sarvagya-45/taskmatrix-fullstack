import mongoose from "mongoose";
import env from "./env.js";

const connectDatabase = async () => {
  try {
    if (!env.mongodbUri) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    const connection = await mongoose.connect(env.mongodbUri);

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

export default connectDatabase;
