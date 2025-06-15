import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { MarketPlaceMinistryInterest } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, occupation, location } = await request.json();

    if (!name || !email || !occupation || !location) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const interest = new MarketPlaceMinistryInterest({ name, email, occupation, location, date: new Date() });
    await interest.save();

    return NextResponse.json({ message: 'Market Place Ministry interest submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save Market Place Ministry interest' }, { status: 500 });
  }
}