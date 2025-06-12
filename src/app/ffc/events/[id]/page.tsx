"use client"

import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function EventDetails() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [event, setEvent] = useState<{
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (id === null) return;

    // Mock data (replace with API call in a real app)
    const mockEvents = [
      {
        id: 1,
        title: '25th Anniversary Celebration',
        date: 'December 15, 2025',
        time: '6:00 PM - 10:00 PM EAT',
        location: 'Vine Grounds, Kampala',
        description: 'Join us to celebrate 25 years of God’s faithfulness and glory with worship, testimonies, and a special service.',
        image: '/images/anniversary-event.jpeg',
      },
      {
        id: 2,
        title: 'Coming Home Celebration',
        date: 'December 15, 2025',
        time: '6:00 PM - 10:00 PM EAT',
        location: 'Faith Family Church, Kampala',
        description: 'Join us to celebrate 25 years of God’s faithfulness and glory with worship, testimonies, and a special service.',
        image: '/images/anniversary-event.jpeg',
      },
      {
        id: 3,
        title: '25 Silver Jubilee',
        date: 'July 6, 2025',
        time: '10:00 AM - 2:00 PM EAT',
        location: 'Vine International Christian Academy, Kungu',
        description: 'Celebrate 25 years of ministry with a special jubilee service, music, and community fellowship.',
        image: '/images/anniversary-event.jpeg',
      },
      {
        id: 4,
        title: 'Alumni Reunion',
        date: 'December 31, 2024 - January 1, 2025',
        time: '6:00 PM - 5:00 AM EAT',
        location: 'Faith Family Church, Kampala',
        description: 'A powerful night of prayer to welcome the New Year with faith and thanksgiving.',
        image: '/images/night-of-prayer.jpg',
      },
    ];
    const foundEvent = mockEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      setEvent(null); // Keeps loading state or can redirect
    }
  }, [id]);

  if (!event) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

            {/* <Header/> */}
      <Head>
        <title>Events - Latter Glory Ministries</title>
        <meta name="description" content="Explore upcoming and past events at Latter Glory Ministries, including the 25th Anniversary and Night of Prayer." />
      </Head>

      {/* Hero Section */}
       {/* <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-opacity-10 bg-black" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
             <span className="text-yellow-300">{event.title}</span>
            <meta name="description" content={event.description} />
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Join Latter Glory Ministries for transformative events that unite our global community in faith and worship.
          </p>
        </div>
      </section>  */}


      {/* <Head>
        <title>{event.title} - Latter Glory Ministries</title>
        <meta name="description" content={event.description} />
      </Head> */}

   

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 mb-8">
            <Image
              src={event.image}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Details</h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
          <p className="text-gray-600 mb-2"><strong>Time:</strong> {event.time}</p>
          <p className="text-gray-600 mb-4"><strong>Location:</strong> {event.location}</p>

          {/* Add to Calendar */}
          <a
            href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${new Date(event.date.split(' - ')[0]).toISOString().replace(/-|:|\.\d+Z$/g, '')}/${new Date(event.date.split(' - ')[1] || event.date).toISOString().replace(/-|:|\.\d+Z$/g, '')}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors mb-4"
          >
            Add to Calendar
          </a>

          {/* Location Map (Static Google Maps Example) */}
          <div className="relative h-64 w-full mb-4">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </div>
  );
}