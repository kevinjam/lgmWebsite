import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BookPurchase } from '@/lib/models';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, phoneNumber, quantity, paymentMethod, amount } = await request.json();

    // Validation - check all required fields
    if (!name || !email || !phoneNumber || typeof quantity === 'undefined' || !paymentMethod || typeof amount === 'undefined') {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }

    // Validate phone number format (E.164)
    if (!phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
      return NextResponse.json(
        { error: 'Invalid international phone number format' }, 
        { status: 400 }
      );
    }

    // Validate quantity is a positive number
    if (quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { error: 'Quantity must be between 1 and 10' }, 
        { status: 400 }
      );
    }

    // Create new book purchase record with all fields
    const purchase = new BookPurchase({
      name,
      email,
      phoneNumber,
      quantity: Number(quantity),
      paymentMethod,
      amount: Number(amount),
      status: 'pending'
    });

    // Save to database
    const savedPurchase = await purchase.save();

    return NextResponse.json(
      { 
        message: 'Book purchase request received successfully',
        data: {
          id: savedPurchase._id,
          name: savedPurchase.name,
          email: savedPurchase.email,
          phoneNumber: savedPurchase.phoneNumber,
          quantity: savedPurchase.quantity,
          paymentMethod: savedPurchase.paymentMethod,
          amount: savedPurchase.amount,
          createdAt: savedPurchase.createdAt
        }
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing book purchase:', error);
    
    // Handle duplicate key errors
    type MongoErrorWithCode = { code?: number };
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as MongoErrorWithCode).code === 11000
    ) {
      return NextResponse.json(
        { error: 'This email or phone number is already registered' }, 
        { status: 400 }
      );
    }
    
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'Failed to process purchase';
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}