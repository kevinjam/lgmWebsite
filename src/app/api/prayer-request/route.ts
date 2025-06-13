import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { PrayerRequest } from '@/lib/models';

export async function POST(req: Request) {
  try {
    const { ministryId, name, request: prayerText } = await req.json();
    if (!ministryId || !name || !prayerText) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();
    const prayerRequest = new PrayerRequest({ ministryId, name, request: prayerText });
    await prayerRequest.save();

    return NextResponse.json({ message: 'Prayer request submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving prayer request:', error);
    return NextResponse.json({ error: 'Failed to submit prayer request' }, { status: 500 });
  }
}