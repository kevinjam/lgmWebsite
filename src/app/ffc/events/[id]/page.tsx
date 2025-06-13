import Link from 'next/link';
import FFCNav from '@/components/FFCNav';
import { EventDetailsClient } from './ClientComponents';

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

async function fetchEvent(id: string): Promise<Event | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/events/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
  const event = await fetchEvent(id);

  const Placeholder = () => (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="h-12 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative h-96 bg-gray-200 animate-pulse"></div>
            <div className="p-8">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-8">
            <div className="h-6 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FFCNav />
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Event Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              The event you are looking for could not be found. Please check the URL or explore other events.
            </p>
            <Placeholder />
            <div className="text-center mt-8">
              <Link
                href="/ffc/events"
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                View All Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <EventDetailsClient event={event} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await fetchEvent(id);
  return {
    title: event ? `${event.title} - Latter Glory Ministries` : 'Event Not Found',
    description: event ? event.description : 'Event not found.',
  };
}