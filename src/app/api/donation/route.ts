import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Donation } from '@/lib/models';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const donations = await Donation.find({}).lean();

    const formattedDonations = donations.map(donation => ({
      _id: donation._id.toString(),
      name: donation.name,
      email: donation.email,
      amount: donation.amount,
      message: donation.message,
      txRef: donation.txRef,
      status: donation.status,
      createdAt: donation.createdAt.toISOString(),
      paymentMethod: donation.paymentMethod,
    }));

    return NextResponse.json({ success: true, data: formattedDonations }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching donations:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, amount, message, txRef, status, paymentMethod } = await request.json();

    if (!amount || !txRef || !status || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields: amount, txRef, status, or paymentMethod' }, { status: 400 });
    }

    const existingDonation = await Donation.findOne({ txRef });
    if (existingDonation) {
      return NextResponse.json({ message: 'Donation with this txRef already exists' }, { status: 409 });
    }

    const donation = await Donation.create({
      name: name || 'Anonymous',
      email: email || null,
      amount: Number(amount),
      message: message || null,
      txRef,
      status,
      paymentMethod,
      createdAt: new Date(),
    });

    const formattedDonation = {
      _id: donation._id.toString(),
      name: donation.name,
      email: donation.email,
      amount: donation.amount,
      message: donation.message,
      txRef: donation.txRef,
      status: donation.status,
      createdAt: donation.createdAt.toISOString(),
      paymentMethod: donation.paymentMethod,
    };

    return NextResponse.json({ success: true, message: 'Donation successful', data: formattedDonation }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error saving donation:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to save donation' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();

    const { _id, name, email, amount, message, txRef, status, paymentMethod } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: 'Missing required field: _id' }, { status: 400 });
    }

    const donation = await Donation.findById(_id);
    if (!donation) {
      return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    donation.name = name || donation.name;
    donation.email = email || donation.email;
    donation.amount = amount ? Number(amount) : donation.amount;
    donation.message = message || donation.message;
    donation.txRef = txRef || donation.txRef;
    donation.status = status || donation.status;
    donation.paymentMethod = paymentMethod || donation.paymentMethod;

    const updatedDonation = await donation.save();

    const formattedDonation = {
      _id: updatedDonation._id.toString(),
      name: updatedDonation.name,
      email: updatedDonation.email,
      amount: updatedDonation.amount,
      message: updatedDonation.message,
      txRef: updatedDonation.txRef,
      status: updatedDonation.status,
      createdAt: updatedDonation.createdAt.toISOString(),
      paymentMethod: updatedDonation.paymentMethod,
    };

    return NextResponse.json({ success: true, message: 'Donation updated', data: formattedDonation }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating donation:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to update donation' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();

    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: 'Missing required field: _id' }, { status: 400 });
    }

    const donation = await Donation.findById(_id);
    if (!donation) {
      return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    await Donation.deleteOne({ _id });
    return NextResponse.json({ success: true, message: 'Donation deleted' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting donation:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: 'Failed to delete donation' }, { status: 500 });
  }
}