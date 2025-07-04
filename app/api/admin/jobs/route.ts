import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongo } from '@/lib/mongodb';
import Job from '@/models/Job';
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

// GET /api/admin/jobs - List all jobs with filtering and pagination
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
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const author = searchParams.get('author');

    // Build query
    const query: any = {};
    
    // If user is author, only show their own jobs
    if (user.role === 'author') {
      query['author.id'] = user._id.toString();
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (department && department !== 'all') {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { requirements: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    if (author && user.role === 'admin') {
      query['author.id'] = author;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get jobs with pagination
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Job.countDocuments(query);

    // Get stats
    const totalJobs = await Job.countDocuments(user.role === 'author' ? { 'author.id': user._id.toString() } : {});
    const publishedJobs = await Job.countDocuments({
      ...(user.role === 'author' ? { 'author.id': user._id.toString() } : {}),
      status: 'published'
    });
    const draftJobs = await Job.countDocuments({
      ...(user.role === 'author' ? { 'author.id': user._id.toString() } : {}),
      status: 'draft'
    });
    const closedJobs = await Job.countDocuments({
      ...(user.role === 'author' ? { 'author.id': user._id.toString() } : {}),
      status: 'closed'
    });

    const totalApplications = await Job.aggregate([
      ...(user.role === 'author' ? [{ $match: { 'author.id': user._id.toString() } }] : []),
      { $group: { _id: null, totalApplications: { $sum: '$stats.applications' } } }
    ]);

    return NextResponse.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        limit
      },
      stats: {
        total: totalJobs,
        published: publishedJobs,
        drafts: draftJobs,
        closed: closedJobs,
        totalApplications: totalApplications[0]?.totalApplications || 0
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/jobs - Create new job
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
      department,
      location,
      type,
      experience,
      salary,
      description,
      requirements = [],
      benefits = [],
      tags = [],
      icon,
      color,
      featured = false,
      status = 'draft',
      responsibilities = [],
      qualifications = [],
      skills = [],
      company = {},
      applicationDeadline,
      startDate,
      remoteWork = false,
      relocation = false,
      visaSponsorship = false,
      contact = {},
      seo = {}
    } = data;

    // Validation
    if (!title || !department || !location || !type || !experience || !salary || !description) {
      return NextResponse.json(
        { error: 'Title, department, location, type, experience, salary, and description are required' },
        { status: 400 }
      );
    }

    if (!requirements || requirements.length === 0) {
      return NextResponse.json(
        { error: 'At least one requirement is required' },
        { status: 400 }
      );
    }

    if (!benefits || benefits.length === 0) {
      return NextResponse.json(
        { error: 'At least one benefit is required' },
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
    while (await Job.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Set publish date if status is published
    const publishedAt = status === 'published' ? new Date() : undefined;

    // Prepare SEO data with proper length validation
    const metaDescription = seo.metaDescription || description.substring(0, 160);
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Create job
    const job = new Job({
      title,
      slug,
      department,
      location,
      type,
      experience,
      salary,
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      tags: Array.isArray(tags) ? tags : [],
      icon: icon || 'Briefcase',
      color: color || 'from-blue-500 to-indigo-600',
      featured: featured || false,
      status,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      qualifications: Array.isArray(qualifications) ? qualifications : [],
      skills: Array.isArray(skills) ? skills : [],
      company: {
        name: company.name || 'Metadots',
        description: company.description,
        logo: company.logo,
        website: company.website
      },
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      remoteWork: remoteWork || false,
      relocation: relocation || false,
      visaSponsorship: visaSponsorship || false,
      contact: {
        name: contact.name || user.name,
        email: contact.email || user.email,
        phone: contact.phone
      },
      author: {
        id: user._id,
        name: user.name,
        role: user.role
      },
      publishedAt,
      seo: {
        metaTitle: truncatedMetaTitle,
        metaDescription: truncatedMetaDescription,
        keywords: seo.keywords || tags || []
      }
    });

    await job.save();

    return NextResponse.json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 