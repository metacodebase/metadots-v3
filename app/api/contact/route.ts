import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectMongo();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      projectType,
      budgetRange,
      projectDetails,
      source = 'contact-page'
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !projectType || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client information
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create new contact submission
    const contact = new Contact({
      firstName,
      lastName,
      email,
      company: company || '',
      projectType,
      budgetRange: budgetRange || "Let's discuss",
      projectDetails,
      source,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        contactId: contact._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { projectDetails: { $regex: search, $options: 'i' } }
      ];
    }

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email');

    // Get total count
    const total = await Contact.countDocuments(query);

    // Get status counts
    const statusCounts = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const stats = {
      total,
      new: 0,
      contacted: 0,
      qualified: 0,
      proposal: 0,
      closed: 0
    };

    statusCounts.forEach(({ _id, count }) => {
      if (_id in stats) {
        stats[_id as keyof typeof stats] = count;
      }
    });

    return NextResponse.json({
      contacts: JSON.parse(JSON.stringify(contacts)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
} 