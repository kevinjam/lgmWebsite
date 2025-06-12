import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { HeroSlide } from '../../../lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching hero slides');
    const slides = await HeroSlide.find({}).lean();
    console.log('Found slides:', slides);
    return NextResponse.json(slides, { status: 200 });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}