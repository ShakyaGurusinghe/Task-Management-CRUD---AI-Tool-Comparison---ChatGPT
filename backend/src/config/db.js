import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  if (!mongoUri) throw new Error("MONGODB_URI is required");

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    autoIndex: process.env.NODE_ENV !== "production"
  });

  console.log("✅ MongoDB connected");
}