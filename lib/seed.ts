import { config } from "dotenv";
config({ path: ".env.local" });
import { connectMongo } from "./mongodb";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function seed() {
  await connectMongo();

  // Drop the database
  await mongoose.connection.dropDatabase();
  console.log("Database dropped.");

  const users = [
    {
      email: "admin@metadots.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      isActive: true
    },
    {
      email: "author@metadots.com",
      password: "author123",
      name: "Author User",
      role: "author",
      isActive: true
    },
    {
      email: "user@metadots.com",
      password: "user123",
      name: "Regular User",
      role: "user",
      isActive: false
    }
  ];

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await User.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
      isActive: userData.isActive
    });
    console.log(`${userData.role} user created: ${userData.email} (isActive: ${userData.isActive})`);
  }

  console.log("Seeding completed!");
  process.exit(0);
}

seed(); 