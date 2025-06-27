import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Transaction, MtnMomoCredential } from '@/lib/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let transactionId = searchParams.get('transactionId');

  // Handle unnamed query parameters (e.g., ?1109483852)
  const unnamedParamEntry = searchParams.entries().next().value;
  if (!transactionId && unnamedParamEntry) {
    transactionId = unnamedParamEntry[0];
    // console.warn(`Unnamed query parameter detected: ${transactionId}. Expected format: ?transactionId=${transactionId}`);
  }

  if (!transactionId) {
    return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
  }

  const subscriptionKeys = [
    '8eb5185fab4b46ff8d5a64386b06ba1a', // Secondary key
    '71d0f0578e3b463099c4e3c69bb26661', // Primary key
  ];
  const subscriptionKey = subscriptionKeys[0]; // Use secondary key first
  const environment = process.env.MTN_MOMO_ENVIRONMENT || 'sandbox';
  const tokenUrl = process.env.MTN_MOMO_TOKEN_URL || 'https://sandbox.momodeveloper.mtn.com/collection/token/';
  const statusUrl = (process.env.MTN_MOMO_STATUS_URL || 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/{transactionId}').replace('{transactionId}', transactionId);

  // Load API credentials
  let apiUserId = process.env.MTN_MOMO_API_USER_ID;
  let apiKey = process.env.MTN_MOMO_API_KEY;
  try {
    await connectToDatabase();
    // console.log('MongoDB connection established for status check');
    if (!apiUserId || !apiKey) {
      const config = await MtnMomoCredential.findOne().sort({ updatedAt: -1 });
      if (!config) {
        return NextResponse.json({ error: 'Missing API credentials in environment and database. Run payment endpoint to provision credentials.' }, { status: 500 });
      }
      apiUserId = config.apiUserId;
      apiKey = config.apiKey;
      console.log('Credentials loaded from MongoDB:', { apiUserId });
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
  }

  if (!apiUserId || !apiKey) {
    return NextResponse.json({ error: 'Missing API credentials' }, { status: 500 });
  }

  // Generate OAuth 2.0 Access Token
  const auth = Buffer.from(`${apiUserId}:${apiKey}`).toString('base64');
  let accessToken;
  try {
    // console.log('Attempting token request with:', { tokenUrl, subscriptionKey, authHeader: `Basic ${auth}` });
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grant_type: 'client_credentials' }),
    });

    const tokenData = await tokenResponse.text();
    if (!tokenResponse.ok) {
    //   console.error('Token Request Failed:', {
    //     status: tokenResponse.status,
    //     response: tokenData,
    //     authHeader: `Basic ${auth}`,
    //     subscriptionKey,
    //     tokenUrl,
    //   });
      return NextResponse.json({ error: `Token request failed: ${tokenData || 'Unknown error'}` }, { status: tokenResponse.status });
    }
    const parsedTokenData = JSON.parse(tokenData);
    accessToken = parsedTokenData.access_token;
    if (!accessToken) {
    //   console.error('Access Token Missing in Response:', parsedTokenData);
      return NextResponse.json({ error: 'Token request succeeded but no access_token returned' }, { status: 500 });
    }
    // console.log('Access Token generated successfully:', accessToken);
  } catch (error) {
    console.error('Token Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate access token' }, { status: 500 });
  }

  // Check Transaction Status
  try {
    // console.log('Checking transaction status:', { transactionId, statusUrl });
    const statusResponse = await fetch(statusUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Target-Environment': environment,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    });

    const statusData = await statusResponse.json();
    if (statusResponse.ok) {
      // Update MongoDB
      try {
        await Transaction.findOneAndUpdate(
          { _id: transactionId },
          { status: statusData.status, financialTransactionId: statusData.financialTransactionId, updatedAt: new Date() },
          { upsert: true }
        );
        // console.log('Transaction status updated:', { transactionId, status: statusData.status });
        return NextResponse.json({ message: 'Transaction status updated', data: statusData });
      } catch (error) {
        let errorMessage = '';
        let errorName = '';
        let errorStack = '';
        if (error instanceof Error) {
          errorMessage = error.message;
          errorName = error.name;
          errorStack = error.stack || '';
        }
        console.error('MongoDB Update Error:', {
          message: errorMessage,
          name: errorName,
          stack: errorStack,
          transactionId,
        });
        return NextResponse.json({ message: 'Status retrieved but failed to update database', data: statusData }, { status: 200 });
      }
    } else {
      console.error('Status Check Failed:', {
        status: statusResponse.status,
        response: statusData,
        transactionId,
      });
      return NextResponse.json({ error: `Status check failed: ${statusData.reason || 'Unknown error'}` }, { status: statusResponse.status });
    }
  } catch (error) {
    console.error('MTN MoMo Status Check Error:', error);
    return NextResponse.json({ error: 'Error checking transaction status' }, { status: 500 });
  }
}