// api/student-mission/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { StudentMissionSignup } from '@/lib/models';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const body = await request.json();
    const { name, email, phoneNumber, interest } = body;

    // Validation
    if (!name || !email || !phoneNumber || !interest) {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      );
    }

    // Validate international phone number format (E.164)
    if (!phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
      return NextResponse.json(
        { error: 'Invalid international phone number format' }, 
        { status: 400 }
      );
    }

    // Create new submission
    const submission = new StudentMissionSignup({
      name,
      email,
      phoneNumber,
      interest
    });

    // Save to database
    const savedSubmission = await submission.save();

    // Log and return success
    console.log('New submission saved:', savedSubmission);
    
    return NextResponse.json(
      { 
        message: 'Submission successful',
        data: {
          id: savedSubmission._id,
          createdAt: savedSubmission.createdAt
        }
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('API error:', error);
    
    // Handle duplicate key errors (e.g., unique email)
    interface MongoError {
      code?: number;
      [key: string]: unknown;
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as MongoError).code === 11000
    ) {
      return NextResponse.json(
        { error: 'This email or phone number is already registered' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}