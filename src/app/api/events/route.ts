import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Event } from '@/lib/models';
import { IEvent } from '@/lib/event.interface';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching Events');
    const events = await Event.find({}).lean();
    // console.log('Found events:', events);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching Events:', error);
    return NextResponse.json({ error: 'Failed to fetch Events' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body: IEvent = await request.json();
    console.log('Creating Event:', body);
    
    // Validate required fields
    const requiredFields = ['title', 'date', 'time', 'location', 'description', 'image', 'isUpcoming'];
    for (const field of requiredFields) {
      if (!body[field as keyof IEvent]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const newEvent = new Event(body);
    await newEvent.save();
    console.log('Event created:', newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating Event:', error);
    return NextResponse.json({ error: 'Failed to create Event' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { _id, ...updateData } = body;
    console.log('Updating Event:', _id, updateData);

    if (!_id) {
      return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    console.log('Event updated:', updatedEvent);
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error('Error updating Event:', error);
    return NextResponse.json({ error: 'Failed to update Event' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { _id } = await request.json();
    console.log('Deleting Event:', _id);

    if (!_id) {
      return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(_id).lean();

    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    console.log('Event deleted:', deletedEvent);
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Event:', error);
    return NextResponse.json({ error: 'Failed to delete Event' }, { status: 500 });
  }
}