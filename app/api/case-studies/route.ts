import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

// GET /api/case-studies - Get published case studies (public)
export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const industry = searchParams.get('industry');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    // Build filter - only published case studies
    const filter: any = { status: 'published' };
    
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
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content -seo -stats') // Exclude sensitive fields
      .lean();

    // Get total count
    const total = await CaseStudy.countDocuments(filter);

    return NextResponse.json({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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