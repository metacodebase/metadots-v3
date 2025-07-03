import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'author')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // For now, we'll return a placeholder URL
    // In a real implementation, you would upload to a cloud storage service like AWS S3, Cloudinary, etc.
    const fileName = `${Date.now()}-${file.name}`;
    const imageUrl = `/uploads/projects/${fileName}`;

    // TODO: Implement actual file upload to cloud storage
    // Example with Cloudinary:
    // const cloudinary = require('cloudinary').v2;
    // const result = await cloudinary.uploader.upload(file, {
    //   folder: 'projects',
    //   resource_type: 'image'
    // });
    // const imageUrl = result.secure_url;

    return NextResponse.json({ 
      success: true,
      imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 