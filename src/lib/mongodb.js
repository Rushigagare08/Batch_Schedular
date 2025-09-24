import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectMongoDB = async () => {
  if (isConnected) {
    // Already connected
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error; // throw error so API route knows
  }
};
