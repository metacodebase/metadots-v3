import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  console.log(`[${new Date().toISOString()}] Context API called`);
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return NextResponse.json({ 
        error: "No token provided" 
      }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ 
        error: "Invalid token" 
      }, { status: 401 });
    }

    await connectMongo();
    
    // Fetch current user data from database to ensure it's up to date
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return NextResponse.json({ 
        error: "User not found" 
      }, { status: 404 });
    }

    // Check if user is still active
    if (!user.isActive) {
      return NextResponse.json({ 
        error: "Account is inactive. Please contact administrator." 
      }, { status: 403 });
    }

    // Check if user still has required role (only admin and author can access)
    if (!['admin', 'author'].includes(user.role)) {
      return NextResponse.json({ 
        error: "Access denied. Insufficient permissions." 
      }, { status: 403 });
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Context validation error:', error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
} 