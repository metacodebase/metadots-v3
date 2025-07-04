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

// GET /api/admin/jobs/[id] - Get single job
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

    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if author can only access their own jobs
    if (user.role === 'author' && job.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/jobs/[id] - Update job
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

    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if author can only edit their own jobs
    if (user.role === 'author' && job.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const {
      title,
      department,
      location,
      type,
      experience,
      salary,
      description,
      requirements,
      benefits,
      tags,
      icon,
      color,
      featured,
      status,
      responsibilities,
      qualifications,
      skills,
      company,
      applicationDeadline,
      startDate,
      remoteWork,
      relocation,
      visaSponsorship,
      contact,
      seo
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

    // Update slug if title changed
    let slug = job.slug;
    if (title !== job.title) {
      const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Ensure unique slug
      slug = baseSlug;
      let counter = 1;
      while (await Job.findOne({ slug, _id: { $ne: params.id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Handle publish date
    let publishedAt = job.publishedAt;
    if (status === 'published' && job.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = undefined;
    }

    // Prepare SEO data with proper length validation
    const metaDescription = seo?.metaDescription || description.substring(0, 160);
    const truncatedMetaDescription = metaDescription.length > 160 
      ? metaDescription.substring(0, 157) + '...' 
      : metaDescription;

    const metaTitle = seo?.metaTitle || title;
    const truncatedMetaTitle = metaTitle.length > 60 
      ? metaTitle.substring(0, 57) + '...' 
      : metaTitle;

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      params.id,
      {
        title,
        slug,
        department,
        location,
        type,
        experience,
        salary,
        description,
        requirements: Array.isArray(requirements) ? requirements : job.requirements,
        benefits: Array.isArray(benefits) ? benefits : job.benefits,
        tags: Array.isArray(tags) ? tags : job.tags,
        icon: icon || job.icon,
        color: color || job.color,
        featured: featured !== undefined ? featured : job.featured,
        status,
        responsibilities: Array.isArray(responsibilities) ? responsibilities : job.responsibilities,
        qualifications: Array.isArray(qualifications) ? qualifications : job.qualifications,
        skills: Array.isArray(skills) ? skills : job.skills,
        company: {
          name: company?.name || job.company.name,
          description: company?.description || job.company.description,
          logo: company?.logo || job.company.logo,
          website: company?.website || job.company.website
        },
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : job.applicationDeadline,
        startDate: startDate ? new Date(startDate) : job.startDate,
        remoteWork: remoteWork !== undefined ? remoteWork : job.remoteWork,
        relocation: relocation !== undefined ? relocation : job.relocation,
        visaSponsorship: visaSponsorship !== undefined ? visaSponsorship : job.visaSponsorship,
        contact: {
          name: contact?.name || job.contact.name,
          email: contact?.email || job.contact.email,
          phone: contact?.phone || job.contact.phone
        },
        publishedAt,
        seo: {
          metaTitle: truncatedMetaTitle,
          metaDescription: truncatedMetaDescription,
          keywords: seo?.keywords || tags || job.tags
        }
      },
      { new: true }
    );

    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/jobs/[id] - Delete job
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

    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if author can only delete their own jobs
    if (user.role === 'author' && job.author.id !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    await Job.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 