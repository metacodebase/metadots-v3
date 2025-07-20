import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

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
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
    }

    // Validate file size (10MB limit for blog images)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `blog-${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to base64 for immediate use
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    console.log('File uploaded:', {
      name: file.name,
      type: file.type,
      size: file.size,
      base64Length: base64.length
    });

    // Also save to local storage for persistence
    try {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'blogs');
      
      // Create directory if it doesn't exist
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, buffer);

      // Return both base64 (for immediate use) and file path (for persistence)
      return NextResponse.json({ 
        success: true,
        url: dataUrl, // Base64 for immediate display
        filePath: `/uploads/blogs/${fileName}`, // File path for persistence
        message: 'Image uploaded successfully'
      });
    } catch (storageError) {
      console.error('Error saving file locally:', storageError);
      
      // If local storage fails, still return base64 for immediate use
      return NextResponse.json({ 
        success: true,
        url: dataUrl,
        message: 'Image uploaded successfully (base64 only)'
      });
    }

    // TODO: For production, implement cloud storage like Cloudinary or AWS S3
    // Example with Cloudinary:
    // const cloudinary = require('cloudinary').v2;
    // const result = await cloudinary.uploader.upload(file, {
    //   folder: 'blogs',
    //   resource_type: 'image',
    //   transformation: [
    //     { width: 1200, height: 630, crop: 'limit' },
    //     { quality: 'auto', fetch_format: 'auto' }
    //   ]
    // });
    // const imageUrl = result.secure_url;

    // Example with AWS S3:
    // const AWS = require('aws-sdk');
    // const s3 = new AWS.S3();
    // const uploadParams = {
    //   Bucket: process.env.AWS_S3_BUCKET,
    //   Key: `blogs/${fileName}`,
    //   Body: file,
    //   ContentType: file.type,
    //   ACL: 'public-read'
    // };
    // const result = await s3.upload(uploadParams).promise();
    // const imageUrl = result.Location;

  } catch (error: any) {
    console.error('Error uploading blog image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 