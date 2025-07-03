import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    console.log('Updating project with data:', body);
    console.log('Technologies received for update:', body.technologies);
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

    // Find and update project
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Update project
    const updateData = {
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
      publishedAt: status === 'published' ? new Date() : project.publishedAt
    };
    
    console.log('Updating project with data:', updateData);
    console.log('Technologies being updated:', updateData.technologies);
    
    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );
    
    console.log('Project updated successfully:', updatedProject);

    return NextResponse.json({ 
      message: 'Project updated successfully',
      project: updatedProject 
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Find and delete project
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({ 
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 