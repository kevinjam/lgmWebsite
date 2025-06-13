"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Use named import
import { CalendarIcon, ClockIcon, MapPinIcon, ShareIcon, UserPlusIcon } from '@heroicons/react/24/outline';

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

export function EventDetailsClient({ event }: { event: Event }) {
  const getGoogleCalendarUrl = () => {
    try {
      const startDate = new Date(`${event.date.split(' - ')[0]} ${event.time.split('-')[0]?.trim() || event.time}`);
      const endDate = new Date(`${event.date.split(' - ')[1] || event.date} ${event.time.split('-')[1]?.trim() || event.time}`);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Invalid date/time:', event.date, event.time);
        return '#';
      }
      const formattedStart = startDate.toISOString().replace(/[-:]/g, '').split('.')[0];
      const formattedEnd = endDate.toISOString().replace(/[-:]/g, '').split('.')[0];
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formattedStart}/${formattedEnd}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;
    } catch (error) {
      console.error('Error generating Google Calendar URL:', error);
      return '#';
    }
  };

  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px]">
        <Image
          src={event.image}
          alt={`${event.title} image`}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {event.title}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-200 mt-4 max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {event.date} • {event.time}
          </motion.p>
          {event.isUpcoming && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/registration"
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Register Now
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/ffc/events"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 text-lg font-semibold transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </Link>
            <div className="flex space-x-4">
              {event.isUpcoming && (
                <motion.a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Add to Calendar
                </motion.a>
              )}
              <motion.button
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: event.title,
                      text: event.description,
                      url: window.location.href,
                    });
                  } catch (error) {
                    console.error('Error sharing event:', error);
                  }
                }}
                className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-purple-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share Event
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center mb-4">
                    <CalendarIcon className="w-6 h-6 text-purple-600 mr-2" />
                    <p className="text-gray-700 text-lg">
                      <span className="font-semibold">Date:</span> {event.date}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <ClockIcon className="w-6 h-6 text-purple-600 mr-2" />
                    <p className="text-gray-700 text-lg">
                      <span className="font-semibold">Time:</span> {event.time}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-6 h-6 text-purple-600 mr-2" />
                    <p className="text-gray-700 text-lg">
                      <span className="font-semibold">Location:</span> {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Status:</span>{' '}
                    {event.isUpcoming ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Upcoming
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Past
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
              <motion.div
                className="mt-8 relative h-64 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}