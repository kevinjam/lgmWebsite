import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, phone, amount, transactionId, method } = await request.json();

    if (!name || !phone || !amount || !transactionId || !method) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!phone.match(/^\+256\d{9}$/)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const mongoose = await connectToDatabase();
    await mongoose.connection.collection('donations').insertOne({
      name,
      phone,
      amount: Number(amount),
      transactionId,
      method,
      status: 'pending', // Pending verification
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Donation recorded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Donation confirmation error:', error);
    return NextResponse.json({ error: 'Failed to record donation' }, { status: 500 });
  }
}