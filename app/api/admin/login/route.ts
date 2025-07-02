import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validation
    if (!email || !password) {
      return NextResponse.json({ 
        error: "Email and password are required" 
      }, { status: 400 });
    }

    await connectMongo();
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ 
        error: "Account is inactive. Please contact administrator." 
      }, { status: 403 });
    }

    // Check if user has required role (only admin and author can login)
    if (!['admin', 'author'].includes(user.role)) {
      return NextResponse.json({ 
        error: "Access denied. Insufficient permissions." 
      }, { status: 403 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ 
      id: user._id, 
      email: user.email, 
      role: user.role,
      isActive: user.isActive
    }, JWT_SECRET, { expiresIn: "7d" });
    
    return NextResponse.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        role: user.role,
        isActive: user.isActive
      } 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
} 