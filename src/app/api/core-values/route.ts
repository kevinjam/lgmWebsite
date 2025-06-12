import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { CoreValue } from '../../../lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching core values');
    const coreValues = await CoreValue.find({}).lean();
    console.log('Found coreValues:', coreValues);
    return NextResponse.json(coreValues, { status: 200 });
  } catch (error) {
    console.error('Error fetching core values:', error);
    return NextResponse.json({ error: 'Failed to fetch core values' }, { status: 500 });
  }
}