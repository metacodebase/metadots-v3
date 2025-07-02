import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/users - List all users (admin only)
async function getUsers(req: NextRequest, user: any) {
  try {
    await connectMongo();
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/admin/users - Create new user (admin only)
async function createUser(req: NextRequest, user: any) {
  try {
    const { email, password, name, role, isActive = true } = await req.json();

    // Validation
    if (!email || !password || !name || !role) {
      return NextResponse.json({ 
        error: "Email, password, name, and role are required" 
      }, { status: 400 });
    }

    if (!['admin', 'author', 'user'].includes(role)) {
      return NextResponse.json({ 
        error: "Role must be admin, author, or user" 
      }, { status: 400 });
    }

    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ 
        error: "User with this email already exists" 
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      isActive: typeof isActive === 'boolean' ? isActive : isActive === 'true'
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    
    return NextResponse.json({ 
      message: "User created successfully", 
      user: userWithoutPassword 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Export handlers with admin protection
export const GET = requireAdmin(getUsers);
export const POST = requireAdmin(createUser); 