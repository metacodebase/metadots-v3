import mongoose from "mongoose";

export async function connectMongo() {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, { dbName: "metadots" });
} 