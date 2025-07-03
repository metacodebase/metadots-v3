import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

// GET /api/case-studies/[slug] - Get single case study by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongo();

    const caseStudy = await CaseStudy.findOne({ 
      slug: params.slug,
      status: 'published'
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await CaseStudy.findByIdAndUpdate(caseStudy._id, {
      $inc: { 'stats.views': 1 }
    });

    return NextResponse.json({ caseStudy });
  } catch (error: any) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 