import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Event, Ministry } from '@/lib/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await connectToDatabase();

    if (id) {
      console.log('Fetching Ministry:', id);
      const ministry = await Ministry.findById(id).lean();
      if (!ministry) {
        return NextResponse.json({ error: 'Ministry not found' }, { status: 404 });
      }

      // Fetch related upcoming events
      const events = await Event.find({ ministryId: id, isUpcoming: true })
        .lean()
        .limit(3);
      console.log('Found ministry:', ministry, 'Events:', events);

      return NextResponse.json({ ...ministry, events }, { status: 200 });
    }

    console.log('Fetching all ministries');
    const ministries = await Ministry.find().lean();
    return NextResponse.json(ministries, { status: 200 });
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return NextResponse.json({ error: 'Failed to fetch ministries' }, { status: 500 });
  }
}