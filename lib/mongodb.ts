import mongoose from "mongoose";

export async function connectMongo() {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // If already connected, return existing connection
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    // Connection options for Mongoose 8.x
    const options = {
      dbName: "metadots",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Remove bufferCommands as it's deprecated in Mongoose 8.x
    };

    const connection = await mongoose.connect(MONGODB_URI, options);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`MongoDB connection failed: ${error}`);
  }
} 