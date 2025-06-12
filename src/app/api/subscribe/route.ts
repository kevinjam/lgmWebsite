import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

import mailchimp from '@mailchimp/mailchimp_marketing';
import { Subscriber } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { name, email, preference } = await request.json();

    // Validate input
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!['Announcements', 'New Product Offers', 'LGM Media', 'FFC', 'Taiwan', 'GPS'].includes(preference)) {
      return NextResponse.json({ error: 'Invalid preference' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Check for existing subscriber
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    // Save to MongoDB
    const subscriber = new Subscriber({
      name,
      email,
      preference,
      createdAt: new Date(),
    });
    await subscriber.save();

    // Configure Mailchimp
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_API_SERVER,
    });

    // Add to Mailchimp
    try {
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
      if (!audienceId) {
        console.error('MAILCHIMP_AUDIENCE_ID is not set in environment variables.');
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
      }
      await mailchimp.lists.addListMember(audienceId, {
        email_address: email,
        status: 'pending',
        merge_fields: { FULLNAME: name },
        tags: [preference],
      });
    } catch (mailchimpError: unknown) {
      return NextResponse.json(
        { message: 'Subscribed locally, but Mailchimp sync failed. Please confirm your email.' + mailchimpError},
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'Subscribed successfully! Please check your email to confirm.' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}