import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth";

// GET /api/admin/profile - Get current user profile
async function getProfile(req: NextRequest, user: any) {
  try {
    await connectMongo();
    const foundUser = await User.findById(user.id, { password: 0 });
    
    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user: foundUser });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// PUT /api/admin/profile - Update current user profile
async function updateProfile(req: NextRequest, user: any) {
  try {
    const { email, password, name } = await req.json();

    await connectMongo();

    // Check if user exists
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: user.id } });
      if (emailExists) {
        return NextResponse.json({ 
          error: "User with this email already exists" 
        }, { status: 409 });
      }
    }

    // Prepare update data (users can only update email, password, and name)
    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// Export handlers with authentication protection
export const GET = requireAuth(getProfile);
export const PUT = requireAuth(updateProfile); 