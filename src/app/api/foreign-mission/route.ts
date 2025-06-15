import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { ForeignMissionInterest } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, country } = await request.json();

    if (!name || !email || !phoneNumber || !country) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const interest = new ForeignMissionInterest({ name, email, phoneNumber, country, date: new Date() });
    await interest.save();

    return NextResponse.json({ message: 'Foreign mission interest submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save foreign mission interest' }, { status: 500 });
  }
}