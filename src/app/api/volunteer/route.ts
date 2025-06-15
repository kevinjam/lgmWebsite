import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Volunteer } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, location, skills, availability } = await request.json();

    if (!name || !email || !phoneNumber || !location || !skills || !availability) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const volunteer = new Volunteer({ name, email, phoneNumber, location, skills, availability, date: new Date() });
    await volunteer.save();

    return NextResponse.json({ message: 'Volunteer request submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save volunteer request' }, { status: 500 });
  }
}