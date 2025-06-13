import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { Event } from '@/lib/models';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // Note the Promise wrapper
) {
  try {
    await connectToDatabase();
    const { id } = await params; // Await the params first
    console.log('Fetching Event:', id);
    
    const event = await Event.findById(id).lean();
    console.log('Found event:', event);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Error fetching Event:', error);
    return NextResponse.json({ error: 'Failed to fetch Event' }, { status: 500 });
  }
}