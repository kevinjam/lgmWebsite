import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('latterglory');
    const collection = db.collection('registrations');

    const formData = await request.json();
    const result = await collection.insertOne({
      ...formData,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Registration successful', id: result.insertedId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving registration:', error);
    return new Response(JSON.stringify({ message: 'Failed to save registration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}