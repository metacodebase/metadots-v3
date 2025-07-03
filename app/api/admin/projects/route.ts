import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'author')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectMongo();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured && featured !== 'all') {
      query.featured = featured === 'true';
    }

    // Get projects with pagination
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Project.countDocuments(query);

    // Get stats
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
          drafts: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } },
          featured: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$stats.views' },
          totalLikes: { $sum: '$stats.likes' }
        }
      }
    ]);

    return NextResponse.json({
      projects,
      stats: stats[0] || { total: 0, published: 0, drafts: 0, featured: 0, totalViews: 0, totalLikes: 0 },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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

    await connectMongo();

    const body = await request.json();
    console.log('Received project data:', body);
    console.log('Technologies received:', body.technologies);
    const {
      title,
      description,
      category,
      tags,
      image,
      featured,
      metrics,
      client,
      duration,
      team,
      rating,
      status,
      color,
      liveUrl,
      githubUrl,
      caseStudyUrl,
      technologies
    } = body;

    // Validate required fields
    if (!title || !description || !category || !client || !duration || !team) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create project
    const projectData = {
      title,
      description,
      category,
      tags: tags || [],
      image: image || '/placeholder.svg?height=300&width=500',
      featured: featured || false,
      metrics: metrics || {},
      client,
      duration,
      team,
      rating: rating || 0,
      status: status || 'draft',
      color: color || 'from-blue-500 to-indigo-600',
      liveUrl,
      githubUrl,
      caseStudyUrl,
      technologies: technologies || [],
      author: {
        id: decoded.id,
        name: decoded.email,
        role: decoded.role
      },
      publishedAt: status === 'published' ? new Date() : undefined
    };
    
    console.log('Creating project with data:', projectData);
    console.log('Technologies being saved:', projectData.technologies);
    
    const project = new Project(projectData);
    await project.save();
    
    console.log('Project saved successfully:', project);

    return NextResponse.json({ 
      message: 'Project created successfully',
      project 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 