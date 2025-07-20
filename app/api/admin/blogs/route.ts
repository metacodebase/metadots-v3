import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import User from '@/models/User';

// Helper function to verify JWT token
async function verifyToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    await connectMongo();
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive || (user.role !== 'admin' && user.role !== 'author')) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// GET /api/admin/blogs - List all blogs with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const author = searchParams.get('author');

    // Build query
    const query: any = {};
    
    // If user is author, only show their own blogs
    if (user.role === 'author') {
      query['author.id'] = user._id.toString();
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (author && user.role === 'admin') {
      query['author.id'] = author;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get blogs with pagination
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    // Get stats
    const totalBlogs = await Blog.countDocuments(user.role === 'author' ? { 'author.id': user._id.toString() } : {});
    const publishedBlogs = await Blog.countDocuments({
      ...(user.role === 'author' ? { 'author.id': user._id.toString() } : {}),
      status: 'published'
    });
    const draftBlogs = await Blog.countDocuments({
      ...(user.role === 'author' ? { 'author.id': user._id.toString() } : {}),
      status: 'draft'
    });

    const totalViews = await Blog.aggregate([
      ...(user.role === 'author' ? [{ $match: { 'author.id': user._id.toString() } }] : []),
      { $group: { _id: null, totalViews: { $sum: '$stats.views' } } }
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        limit
      },
      stats: {
        total: totalBlogs,
        published: publishedBlogs,
        drafts: draftBlogs,
        totalViews: totalViews[0]?.totalViews || 0
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - Create new blog
export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongo();

    const data = await request.json();
    const {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags = [],
      status = 'draft',
      featured = false,
      scheduledAt,
      seo = {}
    } = data;

    // Validation
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Title, excerpt, content, and category are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Calculate read time
    const readTime = calculateReadTime(content);

    // Set publish date if status is published
    const publishedAt = status === 'published' ? new Date() : undefined;

    // Prepare SEO data with proper length validation
    const metaDescription = seo.metaDescription || excerpt;
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Create blog
    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: Array.isArray(tags) ? tags : [],
      author: {
        id: user._id,
        name: user.name,
        role: user.role,
        designation: user.designation
      },
      status,
      featured,
      publishedAt,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      readTime,
      seo: {
        metaTitle: truncatedMetaTitle,
        metaDescription: truncatedMetaDescription,
        keywords: seo.keywords || tags
      },
      stats: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0
      }
    });

    await blog.save();

    return NextResponse.json({
      message: 'Blog created successfully',
      blog
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 