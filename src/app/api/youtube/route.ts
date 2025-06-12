import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { YoutubeVideo } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching Youtube videos');
    const videos = await YoutubeVideo.find({}).lean();
    console.log('Found videos:', videos);
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error('Error fetching Youtube videos:', error);
    return NextResponse.json({ error: 'Failed to fetch Youtube videos' }, { status: 500 });
  }
}