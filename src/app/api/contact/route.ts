import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Contact } from '@/lib/models';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, phone, subject, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' }, 
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }

    // Create new contact record
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to database
    const savedContact = await contact.save();

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        data: {
          id: savedContact._id,
          name: savedContact.name,
          email: savedContact.email,
          createdAt: savedContact.createdAt
        }
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}