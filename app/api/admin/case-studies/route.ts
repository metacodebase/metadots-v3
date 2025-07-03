import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { verifyToken, getTokenFromRequest, AuthUser } from '@/lib/auth';
import CaseStudy from '@/models/CaseStudy';

// GET /api/admin/case-studies - Get all case studies
export async function GET(request: NextRequest) {
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

    await connectMongo();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const industry = searchParams.get('industry');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    // Build filter
    const filter: any = {};
    
    // Author can only see their own case studies
    if (user.role === 'author') {
      filter['author.id'] = user.id;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (industry && industry !== 'all') {
      filter.industry = industry;
    }
    
    if (featured === 'true') {
      filter.featured = true;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Get case studies with pagination
    const caseStudies = await CaseStudy.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await CaseStudy.countDocuments(filter);

    // Calculate stats
    const stats = await CaseStudy.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
          drafts: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } },
          totalViews: { $sum: '$stats.views' },
          totalDownloads: { $sum: '$stats.downloads' }
        }
      }
    ]);

    return NextResponse.json({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats[0] || {
        total: 0,
        published: 0,
        drafts: 0,
        totalViews: 0,
        totalDownloads: 0
      }
    });
  } catch (error: any) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/case-studies - Create new case study
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

    // Check if user has permission to create case studies
    if (user.role !== 'admin' && user.role !== 'author') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    await connectMongo();

    const data = await request.json();
    const {
      title,
      subtitle,
      description,
      content,
      client,
      industry,
      status = 'draft',
      featured = false,
      duration,
      team,
      budget,
      heroImage,
      gallery = [],
      results = {},
      technologies = [],
      keyFeatures = [],
      process = [],
      testimonials = [],
      challenge,
      solution,
      scheduledAt,
      seo = {}
    } = data;

    // Validation
    if (!title || !description || !content || !client || !industry || !duration || !team || !budget || !challenge || !solution) {
      return NextResponse.json(
        { error: 'Title, description, content, client, industry, duration, team, budget, challenge, and solution are required' },
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
    while (await CaseStudy.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Set publish date if status is published
    const publishedAt = status === 'published' ? new Date() : undefined;

    // Prepare SEO data with proper length validation
    const metaDescription = seo.metaDescription || description;
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Create case study
    const caseStudy = new CaseStudy({
      title,
      slug,
      subtitle,
      description,
      content,
      client,
      industry,
      status,
      featured,
      duration,
      team,
      budget,
      heroImage,
      gallery,
      results,
      technologies,
      keyFeatures,
      process,
      testimonials,
      challenge,
      solution,
      author: {
        id: user.id,
        name: user.email.split('@')[0], // Use email prefix as name
        role: user.role
      },
      publishedAt,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      seo: {
        metaTitle: truncatedMetaTitle,
        metaDescription: truncatedMetaDescription,
        keywords: seo.keywords || []
      },
      stats: {
        views: 0,
        likes: 0,
        downloads: 0,
        shares: 0
      }
    });

    await caseStudy.save();

    return NextResponse.json({
      message: 'Case study created successfully',
      caseStudy
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating case study:', error);
    
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