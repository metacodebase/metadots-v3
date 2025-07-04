import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Job from '@/models/Job';

// GET /api/jobs - Get published jobs for careers page
export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // Build query - only published jobs
    const query: any = { status: 'published' };

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

    if (featured === 'true') {
      query.featured = true;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get jobs with pagination
    const jobs = await Job.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Job.countDocuments(query);

    // Get departments for filtering
    const departments = await Job.distinct('department', { status: 'published' });

    return NextResponse.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        limit
      },
      departments: ['All', ...departments]
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 