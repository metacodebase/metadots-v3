import { config } from "dotenv";

// Try multiple environment files
config({ path: ".env.local" });
config({ path: ".env" });
config({ path: ".env.production" });

import { connectMongo } from "./mongodb";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function seedProd() {
  try {
    // Debug: Check if MONGODB_URI is available
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is not set!");
      console.log("Available environment variables:", Object.keys(process.env).filter(key => key.includes('MONGO')));
      process.exit(1);
    }
    
    console.log("Connecting to MongoDB...");
    await connectMongo();

    // Drop the database
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully.");

    // Create only admin user
    const adminUser = {
      email: "admin@metadots.co",
      password: "Meta@£12Admin",
      name: "Admin User",
      designation: "CEO",
      role: "admin",
      isActive: true
    };

    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({
      email: adminUser.email,
      password: hashedPassword,
      name: adminUser.name,
      designation: adminUser.designation,
      role: adminUser.role,
      isActive: adminUser.isActive
    });

    console.log(`Admin user created: ${adminUser.email}`);
    console.log("Production seeding completed successfully!");
    
  } catch (error) {
    console.error("Error during production seeding:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedProd(); 