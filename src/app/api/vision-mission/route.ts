import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { VisionMission } from '../../../lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const visionMission = await VisionMission.findOne({}).lean();
    if (!visionMission) {
      return NextResponse.json({ error: 'Vision and mission not found' }, { status: 404 });
    }
    return NextResponse.json(visionMission, { status: 200 });
  } catch (error) {
    console.error('Error fetching vision and mission:', error);
    return NextResponse.json({ error: 'Failed to fetch vision and mission' }, { status: 500 });
  }
}