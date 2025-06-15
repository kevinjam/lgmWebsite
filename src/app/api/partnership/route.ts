import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Partnership } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, location, message } = await request.json();

    if (!name || !email || !phoneNumber || !location || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const partnership = new Partnership({ name, email, phoneNumber, location, message, date: new Date() });
    await partnership.save();

    return NextResponse.json({ message: 'Partnership request submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save partnership request' }, { status: 500 });
  }
}