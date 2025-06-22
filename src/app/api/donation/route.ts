import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Donation } from '@/lib/models';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, amount, message, txRef, status } = await request.json();

    if (!amount || !txRef || !status) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const donation = await Donation.create({
      name: name || 'Anonymous',
      email: email || null,
      amount: Number(amount),
      message: message || null,
      txRef,
      status,
    });

    return NextResponse.json({ success: true, message: 'Donation successful', id: donation._id.toString() }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error saving donation:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to save donation' }, { status: 500 });
  }
}