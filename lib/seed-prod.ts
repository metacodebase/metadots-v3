import { config } from "dotenv";
config({ path: ".env.local" });
import { connectMongo } from "./mongodb";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function seedProd() {
  try {
    await connectMongo();

    // Drop the database
    await mongoose.connection.dropDatabase();
    console.log("Database dropped successfully.");

    // Create only admin user
    const adminUser = {
      email: "admin@metadots.co",
      password: "Meta@£12Admin",
      name: "Admin User",
      role: "admin",
      isActive: true
    };

    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    await User.create({
      email: adminUser.email,
      password: hashedPassword,
      name: adminUser.name,
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