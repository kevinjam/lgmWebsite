import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Scripture } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching scriptures from theme_scriptures');
    const scriptures = await Scripture.find({}).lean();
    console.log('Found scriptures:', scriptures);
    return NextResponse.json(scriptures, { status: 200 });
  } catch (error) {
    console.error('Error fetching scriptures:', error);
    return NextResponse.json({ error: 'Failed to fetch scriptures' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { verse, text } = await request.json();

    if (!verse || !text) {
      return NextResponse.json({ error: 'Verse and text are required' }, { status: 400 });
    }

    const scripture = new Scripture({ verse, text });
    await scripture.save();
    console.log('Created scripture:', scripture);

    return NextResponse.json(scripture, { status: 201 });
  } catch (error) {
    console.error('Error creating scripture:', error);
    return NextResponse.json({ error: 'Failed to create scripture' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Extract ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const scripture = await Scripture.findByIdAndDelete(id);
    console.log('Deleted scripture ID:', id);
    if (!scripture) {
      return NextResponse.json({ error: 'Scripture not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Scripture deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting scripture:', error);
    return NextResponse.json({ error: 'Failed to delete scripture' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Extract ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const { verse, text } = await request.json();

    if (!verse || !text) {
      return NextResponse.json({ error: 'Verse and text are required' }, { status: 400 });
    }

    const scripture = await Scripture.findByIdAndUpdate(
      id,
      { verse, text },
      { new: true, runValidators: true }
    );

    console.log('Updated scripture:', scripture);
    if (!scripture) {
      return NextResponse.json({ error: 'Scripture not found' }, { status: 404 });
    }

    return NextResponse.json(scripture, { status: 200 });
  } catch (error) {
    console.error('Error updating scripture:', error);
    return NextResponse.json({ error: 'Failed to update scripture' }, { status: 500 });
  }
}