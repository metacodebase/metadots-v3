import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs - Get published blogs for public view
export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // Build query - only published blogs
    const query: any = { status: 'published' };

    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get blogs with pagination and populate author data
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content') // Exclude full content for list view
      .populate('author.id', 'name email designation role avatar')
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    // Get categories for filter
    const categories = await Blog.distinct('category', { status: 'published' });

    // Get featured blogs if not already filtered
    const featuredBlogs = featured !== 'true' ? await Blog.find({
      status: 'published',
      featured: true
    })
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-content')
    .populate('author.id', 'name email designation role avatar')
    .lean() : [];

    return NextResponse.json({
      blogs,
      featuredBlogs,
      categories: ['All', ...categories],
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        limit
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