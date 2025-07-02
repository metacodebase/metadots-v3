import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
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

// GET /api/admin/blogs/[id] - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongo();

    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if author can only access their own blogs
    if (user.role === 'author' && blog.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blogs/[id] - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongo();

    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if author can only edit their own blogs
    if (user.role === 'author' && blog.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      featured,
      scheduledAt,
      seo
    } = data;

    // Validation
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Title, excerpt, content, and category are required' },
        { status: 400 }
      );
    }

    // Update slug if title changed
    let slug = blog.slug;
    if (title !== blog.title) {
      const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Ensure unique slug
      slug = baseSlug;
      let counter = 1;
      while (await Blog.findOne({ slug, _id: { $ne: params.id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Calculate read time if content changed
    const readTime = content !== blog.content ? calculateReadTime(content) : blog.readTime;

    // Handle publish date
    let publishedAt = blog.publishedAt;
    if (status === 'published' && blog.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = undefined;
    }

    // Prepare SEO data with proper length validation
    const metaDescription = seo?.metaDescription || excerpt;
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo?.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        category,
        tags: Array.isArray(tags) ? tags : [],
        status,
        featured: featured || false,
        publishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        readTime,
        seo: {
          metaTitle: truncatedMetaTitle,
          metaDescription: truncatedMetaDescription,
          keywords: seo?.keywords || tags || []
        }
      },
      { new: true }
    );

    return NextResponse.json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    
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

// DELETE /api/admin/blogs/[id] - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectMongo();

    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if author can only delete their own blogs
    if (user.role === 'author' && blog.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 