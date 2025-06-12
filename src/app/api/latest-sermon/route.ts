import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { LatestSermon } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching Latest Sermon');
    const video = await LatestSermon.findOne({}).sort({ _id: -1 }).lean();
    console.log('Found video:', video);
    if (!video) {
      return NextResponse.json({ error: 'No sermon found' }, { status: 404 });
    }
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error('Error fetching Latest Sermon:', error);
    return NextResponse.json({ error: 'Failed to fetch Latest Sermon' }, { status: 500 });
  }
}