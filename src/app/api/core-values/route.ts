import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { CoreValue } from '../../../lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const coreValues = await CoreValue.find({}).lean();
    return NextResponse.json(coreValues, { status: 200 });
  } catch (error) {
    console.error('Error fetching core values:', error);
    return NextResponse.json({ error: 'Failed to fetch core values' }, { status: 500 });
  }
}