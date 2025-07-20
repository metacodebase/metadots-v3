import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs/[slug] - Get single published blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongo();

    const blog = await Blog.findOne({ 
      slug: params.slug, 
      status: 'published' 
    }).populate('author.id', 'name email designation role');

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, {
      $inc: { 'stats.views': 1 }
    });

    // Get related posts (same category, exclude current post)
    const relatedPosts = await Blog.find({
      category: blog.category,
      status: 'published',
      _id: { $ne: blog._id }
    })
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-content')
    .populate('author.id', 'name email designation role')
    .lean();

    return NextResponse.json({
      blog,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 