import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { LocalMissionInterest } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, location } = await request.json();

    if (!name || !email || !phoneNumber || !location) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const interest = new LocalMissionInterest({ name, email, phoneNumber, location, date: new Date() });
    await interest.save();

    return NextResponse.json({ message: 'Local mission interest submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save local mission interest' }, { status: 500 });
  }
}