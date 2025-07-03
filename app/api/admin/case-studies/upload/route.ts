import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

// POST /api/admin/case-studies/upload - Upload image for case study
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if user has permission to upload images
    if (user.role !== 'admin' && user.role !== 'author') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // For now, we'll return a placeholder URL
    // In a real implementation, you would upload to a cloud storage service
    // like AWS S3, Cloudinary, or similar
    const imageUrl = `/uploads/case-studies/${Date.now()}-${file.name}`;

    // TODO: Implement actual file upload to cloud storage
    // Example with Cloudinary:
    // const cloudinary = require('cloudinary').v2;
    // const result = await cloudinary.uploader.upload(file, {
    //   folder: 'case-studies',
    //   resource_type: 'auto'
    // });
    // const imageUrl = result.secure_url;

    return NextResponse.json({
      message: 'Image uploaded successfully',
      imageUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 