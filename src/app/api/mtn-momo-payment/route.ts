import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Transaction, MtnMomoCredential } from '@/lib/models';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const { amount, phoneNumber } = await request.json();

  if (!amount || !phoneNumber) {
    return NextResponse.json({ error: 'Amount and phone number are required' }, { status: 400 });
  }

  // Subscription keys from MTN MoMo Developer Portal
  const subscriptionKeys = [
    '8eb5185fab4b46ff8d5a64386b06ba1a', // Secondary key
    '71d0f0578e3b463099c4e3c69bb26661', // Primary key
  ];
  const environment = process.env.MTN_MOMO_ENVIRONMENT || 'sandbox';
  const callbackHost = process.env.WEBHOOK_URL || 'https://lgm-donate.vercel.app/api/webhook';
  const apiUserUrl = process.env.MTN_MOMO_API_USER_URL || 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser';
  const tokenUrl = process.env.MTN_MOMO_TOKEN_URL || 'https://sandbox.momodeveloper.mtn.com/collection/token/';
  const collectionUrl = process.env.MTN_MOMO_COLLECTION_URL || 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';
  const currency = process.env.MTN_MOMO_CURRENCY || 'EUR';

  // Connect to MongoDB
  try {
    await connectToDatabase();
    // console.log('MongoDB connection established for payment request');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
  }

  // Load or provision API credentials
  let apiUserId = process.env.MTN_MOMO_API_USER_ID;
  let apiKey = process.env.MTN_MOMO_API_KEY;
  let subscriptionKey = subscriptionKeys[0]; // Default to secondary key

  try {
    if (!apiUserId || !apiKey) {
      const config = await MtnMomoCredential.findOne().sort({ updatedAt: -1 });
      if (config) {
        apiUserId = config.apiUserId;
        apiKey = config.apiKey;
        // console.log('Credentials loaded from MongoDB:', { apiUserId, source: 'MongoDB' });
      } else {
        // console.log('No credentials found. Provisioning new API user...');
        apiUserId = uuidv4();
        // console.log('Generated apiUserId:', apiUserId);

        // Try each subscription key
        for (const key of subscriptionKeys) {
          subscriptionKey = key;
          // console.log('Attempting API user creation with subscription key:', subscriptionKey);

          // Create API User
          const userResponse = await fetch(apiUserUrl, {
            method: 'POST',
            headers: {
              'X-Reference-Id': apiUserId,
              'Ocp-Apim-Subscription-Key': subscriptionKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ providerCallbackHost: callbackHost }),
          });

          const userResponseText = await userResponse.text();
          if (userResponse.ok) {
            // console.log('API User created successfully:', apiUserId);
            break;
          } else {
            // console.error('API User Creation Failed:', {
            //   status: userResponse.status,
            //   response: userResponseText,
            //   subscriptionKey,
            //   apiUserId,
            //   callbackHost,
            // });
            if (key === subscriptionKeys[subscriptionKeys.length - 1]) {
              return NextResponse.json({ error: `API User creation failed with all keys: ${userResponseText || 'Unknown error'}` }, { status: userResponse.status });
            }
            continue;
          }
        }

        // Generate API Key
        const apiKeyUrl = (process.env.MTN_MOMO_API_KEY_URL || 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/{apiUserId}/apikey').replace('{apiUserId}', apiUserId);
        const apiKeyResponse = await fetch(apiKeyUrl, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        const apiKeyData = await apiKeyResponse.json();
        if (!apiKeyResponse.ok) {
          // console.error('API Key Generation Failed:', {
          //   status: apiKeyResponse.status,
          //   response: apiKeyData,
          //   subscriptionKey,
          //   apiKeyUrl,
          // });
          return NextResponse.json({ error: `API Key generation failed: ${apiKeyData.message || 'Unknown error'}` }, { status: apiKeyResponse.status });
        }
        apiKey = apiKeyData.apiKey;
        if (!apiKey) {
          // console.error('API Key Missing in Response:', apiKeyData);
          return NextResponse.json({ error: 'API Key generation succeeded but no apiKey returned' }, { status: 500 });
        }
        // console.log('API Key generated successfully:', apiKey);

        // Store credentials in MtnMomoCredential
        const credential = new MtnMomoCredential({
          apiUserId,
          apiKey,
        });
        await credential.save();
        // console.log('API Credentials saved to MongoDB:', { apiUserId, apiKey });
      }
    } else {
      // console.log('Credentials loaded from environment variables:', { apiUserId, source: 'env' });
    }
  } catch (error) {
    console.error('API User/Key Generation Error:', error);
    return NextResponse.json({ error: 'Failed to provision API credentials' }, { status: 500 });
  }

  if (!apiUserId || !apiKey || !subscriptionKey) {
    // console.error('Credentials not set after provisioning:', { apiUserId, apiKey, subscriptionKey });
    return NextResponse.json({ error: 'Failed to obtain API credentials' }, { status: 500 });
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
      // console.error('Token Request Failed:', {
      //   status: tokenResponse.status,
      //   response: tokenData,
      //   authHeader: `Basic ${auth}`,
      //   subscriptionKey,
      //   tokenUrl,
      // });
      return NextResponse.json({ error: `Token request failed: ${tokenData || 'Unknown error'}` }, { status: tokenResponse.status });
    }
    const parsedTokenData = JSON.parse(tokenData);
    accessToken = parsedTokenData.access_token;
    if (!accessToken) {
      // console.error('Access Token Missing in Response:', parsedTokenData);
      return NextResponse.json({ error: 'Token request succeeded but no access_token returned' }, { status: 500 });
    }
    // console.log('Access Token generated successfully:', accessToken);
  } catch (error) {
    console.error('Token Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate access token' }, { status: 500 });
  }

  // Make Request-to-Pay Call
  const transactionId = uuidv4();
  const payload = {
    amount,
    currency,
    externalId: `DON${Date.now()}`,
    payer: {
      partyIdType: 'MSISDN',
      partyId: `256${phoneNumber.replace(/^0/, '')}`,
    },
    payerMessage: 'Donation to Latter Glory Ministries',
    payeeNote: 'Thank you for your donation',
  };

  try {
    // console.log('Initiating payment request:', { transactionId, payload });
    const response = await fetch(collectionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Reference-Id': transactionId,
        'X-Target-Environment': environment,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.text();
    if (response.ok) {
      // Save to MongoDB
      try {
        console.log('Attempting to save transaction:', { transactionId, payload });
        const transaction = new Transaction({
          _id: transactionId,
          externalId: payload.externalId,
          status: 'PENDING',
          amount: payload.amount,
          currency: payload.currency,
          payer: payload.payer,
          payerMessage: payload.payerMessage,
          payeeNote: payload.payeeNote,
        });
        await transaction.save();
        // console.log('Transaction saved successfully:', transaction.toObject());
        return NextResponse.json({ message: 'Payment request initiated', transactionId });
      } catch (error) {
        console.error('MongoDB Save Error:', {
          message: typeof error === 'object' && error !== null && 'message' in error ? (error as Error).message : String(error),
          name: typeof error === 'object' && error !== null && 'name' in error ? (error as Error).name : undefined,
          stack: typeof error === 'object' && error !== null && 'stack' in error ? (error as Error).stack : undefined,
          transactionId,
          transaction: payload,
        });
        return NextResponse.json({ error: 'Payment initiated but failed to save to database', transactionId }, { status: 500 });
      }
    } else {
      // console.error('Payment Request Failed:', {
      //   status: response.status,
      //   response: responseData,
      //   transactionId,
      // });
      return NextResponse.json({ error: `Payment request failed: ${responseData || 'Unknown error'}` }, { status: response.status });
    }
  } catch (error) {
    console.error('MTN MoMo API Error:', error);
    return NextResponse.json({ error: 'Error processing payment' }, { status: 500 });
  }
}