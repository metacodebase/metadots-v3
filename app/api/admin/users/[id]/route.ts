import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/users/[id] - Get user by ID (admin only)
async function getUser(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const foundUser = await User.findById(params.id, { password: 0 });
    
    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user: foundUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// PUT /api/admin/users/[id] - Update user (admin only)
async function updateUser(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    const { email, password, name, designation, role, isActive } = await req.json();

    await connectMongo();

    // Check if user exists
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validation
    if (role && !['admin', 'author', 'user'].includes(role)) {
      return NextResponse.json({ 
        error: "Role must be admin, author, or user" 
      }, { status: 400 });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: params.id } });
      if (emailExists) {
        return NextResponse.json({ 
          error: "User with this email already exists" 
        }, { status: 409 });
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (designation !== undefined) updateData.designation = designation;
    if (role) updateData.role = role;
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    } else if (typeof isActive === 'string') {
      updateData.isActive = isActive === 'true';
    }

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id] - Delete user (admin only)
async function deleteUser(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectMongo();

    // Check if user exists
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent admin from deleting themselves
    if (params.id === user.id) {
      return NextResponse.json({ 
        error: "Cannot delete your own account" 
      }, { status: 400 });
    }

    // Delete user
    await User.findByIdAndDelete(params.id);

    return NextResponse.json({ 
      message: "User deleted successfully" 
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// Export handlers with admin protection
export const GET = requireAdmin(getUser);
export const PUT = requireAdmin(updateUser);
export const DELETE = requireAdmin(deleteUser); 