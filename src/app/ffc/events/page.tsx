"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FFCNav from '@/components/FFCNav';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  isUpcoming: boolean;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from API route
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch {
        setError('Error fetching events');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Placeholder component for loading/error state
  const PlaceholderCard = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <Head>
        <title>Events - Latter Glory Ministries</title>
        <meta name="description" content="Explore upcoming and past events at Latter Glory Ministries, including the 25th Anniversary and Night of Prayer." />
      </Head>

      {/* Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white text-gray-900">
          <input
            type="text"
            placeholder="Search events by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          {loading || error ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <PlaceholderCard key={index} />
              ))}
            </div>
          ) : filteredEvents.filter(event => event.isUpcoming).length === 0 ? (
            <p className="text-gray-600 text-center">No upcoming events found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => event.isUpcoming)
                .map(event => (
                  <Link key={event._id} href={`/ffc/events/${event._id}`} passHref>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                      <div className="relative h-48">
                        {loading ? (
                          <div className="h-full bg-gray-200 animate-pulse"></div>
                        ) : (
                          <Image
                            src={event.image}
                            alt={`${event.title} image`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-opacity duration-300 hover:opacity-90"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <span className="text-white text-lg font-semibold">{event.title}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-2">{event.date}</p>
                        <p className="text-gray-600 mb-2">{event.time}</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-8">Latest Past Events</h2>
          {loading || error ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <PlaceholderCard key={index} />
              ))}
            </div>
          ) : filteredEvents.filter(event => !event.isUpcoming).length === 0 ? (
            <p className="text-gray-600 text-center">No past events found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => !event.isUpcoming)
                .map(event => (
                  <Link key={event._id} href={`/events/${event._id}`} passHref>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                      <div className="relative h-48">
                        {loading ? (
                          <div className="h-full bg-gray-200 animate-pulse"></div>
                        ) : (
                          <Image
                            src={event.image}
                            alt={`${event.title} image`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-opacity duration-300 hover:opacity-90"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <span className="text-white text-lg font-semibold">{event.title}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-2">{event.date}</p>
                        <p className="text-gray-600 mb-2">{event.time}</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}