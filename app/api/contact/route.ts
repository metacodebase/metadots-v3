import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Contact from '@/models/Contact';



export async function POST(request: NextRequest) {

const SENDER_EMAIL=process.env.SENDER_EMAIL 
const GMAIL_CLIENT_ID=process.env.GMAIL_CLIENT_ID 
const GMAIL_CLIENT_SECRET=process.env.GMAIL_CLIENT_SECRET 
const GMAIL_REFRESH_TOKEN=process.env.GMAIL_REFRESH_TOKEN 

console.log("SENDER_EMAIL:",SENDER_EMAIL);
console.log("GMAIL_CLIENT_ID:",GMAIL_CLIENT_ID);
console.log("GMAIL_CLIENT_SECRET:",GMAIL_CLIENT_SECRET);
console.log("GMAIL_REFRESH_TOKEN:",GMAIL_REFRESH_TOKEN);
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
    console.log('New contact created:', contact.email);

    // Send email to contact and owners using Nodemailer with OAuth2 and HTML templates
    const nodemailer = (await import('nodemailer')).default;
    const fs = await import('fs/promises');
    const path = await import('path');

    // Helper to inject variables into template
    function injectTemplateVars(template: string, vars: Record<string, string>) {
      return template.replace(/{{(\w+)}}/g, (_, key) => vars[key] || '');
    }

    // Load templates via HTTP for Vercel compatibility
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metadots.co';
    const contactRes = await fetch(`${baseUrl}/templates/ContactFormEmail.html`);
    const ownerRes = await fetch(`${baseUrl}/templates/ContactFormSubmission.html`);
    const contactHtml = injectTemplateVars(
      await contactRes.text(),
      { firstName, lastName }
    );
    const ownerHtml = injectTemplateVars(
      await ownerRes.text(),
      { firstName, lastName, email, company: company || '', projectType, budgetRange: budgetRange || "Let's discuss", projectDetails, source, ipAddress, userAgent }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
      },
    });

    // Send to contact
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Thank you for contacting Metadots!',
        html: contactHtml,
      });
      console.log('Contact email sent to:', email);
    } catch (err) {
      console.error('Error sending contact email:', err);
    }

    // Send to owners
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: ['usman@metadots.co', 'iqrar@metadots.co'],
        // to: ['bsef22m514@pucit.edu.pk'],
        subject: 'New Contact Form Submission',
        html: ownerHtml,
      });
      console.log('Owner email sent to: usman@metadots.co, iqrar@metadots.co');
    } catch (err) {
      console.error('Error sending owner email:', err);
    }
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