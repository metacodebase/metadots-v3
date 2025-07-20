import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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