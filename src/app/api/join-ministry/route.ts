import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { MinistrySignup } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, email, phoneNumber, ministry } = await request.json();
    console.log('Received signup data:', { name, email, phoneNumber, ministry });

    if (!name || !email || !phoneNumber || !ministry) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (!phoneNumber.match(/^\+256\d{9}$/)) {
      return NextResponse.json({ message: 'Invalid phone number format' }, { status: 400 });
    }

    const signup = await MinistrySignup.create({
    name,
      email,
      phoneNumber,
      ministry,
    });

    return NextResponse.json({ success: true, message: 'signup successful', id: signup._id.toString() }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error saving ministry signup:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 });
  }
}