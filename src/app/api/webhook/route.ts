import { NextResponse } from 'next/server';

// In production, store in a database (e.g., MongoDB) instead of logging
interface WebhookPayload {
  externalId: string;
  financialTransactionId?: string;
  status: 'SUCCESSFUL' | 'FAILED' | 'PENDING';
  amount?: string;
  currency?: string;
  payer?: {
    partyIdType: string;
    partyId: string;
  };
  reason?: {
    code: string;
    message: string;
  };
}

export async function POST(request: Request) {
  // Verify subscription key
  const subscriptionKey = process.env.MTN_MOMO_SUBSCRIPTION_KEY; // Store in .env for production
  const receivedKey = request.headers.get('Ocp-Apim-Subscription-Key');

  if (!receivedKey || receivedKey !== subscriptionKey) {
    return NextResponse.json({ error: 'Invalid or missing subscription key' }, { status: 401 });
  }

  try {
    const payload: WebhookPayload = await request.json();

    // Log the webhook data for debugging (in production, save to database)
    console.log('Webhook received:', {
      timestamp: new Date().toISOString(),
      externalId: payload.externalId,
      financialTransactionId: payload.financialTransactionId,
      status: payload.status,
      amount: payload.amount,
      currency: payload.currency,
      payer: payload.payer,
      reason: payload.reason,
    });

    // In production, save to database (e.g., MongoDB) for Denis to verify
    // Example: await db.collection('transactions').insertOne(payload);

    // Respond with 200 OK as required by MTN MoMo
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}