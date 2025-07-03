import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { verifyToken, getTokenFromRequest, AuthUser } from '@/lib/auth';
import CaseStudy from '@/models/CaseStudy';

// GET /api/admin/case-studies/[id] - Get single case study
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    // Check if author can only view their own case studies
    if (user.role === 'author' && caseStudy.author.id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json({ caseStudy });
  } catch (error: any) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/case-studies/[id] - Update case study
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    // Check if author can only edit their own case studies
    if (user.role === 'author' && caseStudy.author.id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      title,
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
      scheduledAt,
      seo
    } = data;

    // Validation
    if (!title || !description || !content || !client || !industry || !duration || !team || !budget || !challenge || !solution) {
      return NextResponse.json(
        { error: 'Title, description, content, client, industry, duration, team, budget, challenge, and solution are required' },
        { status: 400 }
      );
    }

    // Update slug if title changed
    let slug = caseStudy.slug;
    if (title !== caseStudy.title) {
      const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Ensure unique slug
      slug = baseSlug;
      let counter = 1;
      while (await CaseStudy.findOne({ slug, _id: { $ne: params.id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Handle publish date
    let publishedAt = caseStudy.publishedAt;
    if (status === 'published' && caseStudy.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = undefined;
    }

    // Prepare SEO data with proper length validation
    const metaDescription = seo?.metaDescription || description;
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo?.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Update case study
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      params.id,
      {
        title,
        slug,
        subtitle,
        description,
        content,
        client,
        industry,
        status,
        featured: featured || false,
        duration,
        team,
        budget,
        heroImage,
        gallery: gallery || [],
        results: results || {},
        technologies: technologies || [],
        keyFeatures: keyFeatures || [],
        process: process || [],
        testimonials: testimonials || [],
        challenge,
        solution,
        publishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        seo: {
          metaTitle: truncatedMetaTitle,
          metaDescription: truncatedMetaDescription,
          keywords: seo?.keywords || []
        }
      },
      { new: true }
    );

    return NextResponse.json({
      message: 'Case study updated successfully',
      caseStudy: updatedCaseStudy
    });
  } catch (error: any) {
    console.error('Error updating case study:', error);
    
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

// DELETE /api/admin/case-studies/[id] - Delete case study
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    // Check if author can only delete their own case studies
    if (user.role === 'author' && caseStudy.author.id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    await CaseStudy.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Case study deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting case study:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 