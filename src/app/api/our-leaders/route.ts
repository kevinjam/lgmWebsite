import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Leaders } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const pastor = await Leaders.findOne({ id }).lean();
      if (!pastor) {
        return NextResponse.json({ error: 'Leader not found' }, { status: 404 });
      }
      return NextResponse.json(pastor, { status: 200 });
    }

    const pastors = await Leaders.find().lean();
    return NextResponse.json(pastors, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaders:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching leaders. Please try again later.' },
      { status: 500 }
    );
  }
}