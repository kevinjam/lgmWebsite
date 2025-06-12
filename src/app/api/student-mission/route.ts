import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, StudentMissionSignup } from '../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, email, phoneNumber, interest } = await request.json();

    if (!name || !email || !phoneNumber || !interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!phoneNumber.match(/^\+256\d{9}$/)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    const signup = await StudentMissionSignup.create({
      name,
      email,
      phoneNumber,
      interest,
    });

    return NextResponse.json({ success: true, id: signup._id.toString() }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error saving student mission signup:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 });
  }
}