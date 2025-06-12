"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSlider from '../../components/HeroSlider';
import Sermon from '../../components/Sermon';
import LatestNews from '../../components/LatestNews';
import Youtube from '../../components/Youtube';
import FFCNav from '../../components/FFCNav';
import { CalendarIcon, UsersIcon, HeartIcon } from '@heroicons/react/24/outline';
import Gallery from '@/components/Gallery';

export default function FFCHome() {
  const events = [
    {
      title: 'Sunday Worship Service',
      date: 'June 15, 2025',
      time: '10:00 AM',
      location: 'Main Sanctuary, Nakawuka',
      description: 'A powerful time of worship, prayer, and teaching.',
    },
    {
      title: 'Midweek Bible Study',
      date: 'June 18, 2025',
      time: '7:00 PM',
      location: 'Room 101, Nakawuka Center',
      description: 'Deep dive into the Book of Romans with Pastor Andrew.',
    },
  ];


  const nextEvent = {
    title: 'Revival Night',
    pastor: 'Pastor Andrew Kisaka',
    time: '7:00 PM - 9:00 PM',
    location: 'Nakawuka Center',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-purple-800 shadow-md">
        <FFCNav />
      </header>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Next Upcoming Event Banner */}
      <section className="bg-purple-800 text-white py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 text-sm sm:text-base">
          <span className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-yellow-400" />
            <span>Next Upcoming Event</span>
          </span>
          <span className="text-center sm:text-left">
            {nextEvent.title} - {nextEvent.pastor}, {nextEvent.time} - {nextEvent.location}
          </span>
        </div>
      </section>

      {/* Pastor’s Welcome */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Faith Family Church
          </motion.h2>
          <motion.p
            className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            At Faith Family Church, we are a family united in Christ, dedicated to worship, discipleship, and serving our community. Join us as we grow closer to God and one another in love and faith.
          </motion.p>
          <Link href="/ffc/about">
            <button className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition">
              Learn More About Us
            </button>
          </Link>
        </div>
      </section>

      {/* Worship, Connect, God’s Love */}
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Worship */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CalendarIcon className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Worship</h3>
              <h4 className="text-sm font-medium text-purple-800 mb-2">What to Expect</h4>
              <p className="text-gray-700 text-sm">
                Experience vibrant worship services filled with music, prayer, and powerful preaching every Sunday at 10 AM.
              </p>
            </motion.div>

            {/* Connect */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <UsersIcon className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
              <h4 className="text-sm font-medium text-purple-800 mb-2">Join Our Family</h4>
              <p className="text-gray-700 text-sm">
                Build meaningful relationships through small groups, Bible studies, and community outreach programs.
              </p>
            </motion.div>

            {/* God’s Love */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HeartIcon className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">God&quot;s Love</h3>
              <h4 className="text-sm font-medium text-purple-800 mb-2">Our Beliefs</h4>
              <p className="text-gray-700 text-sm">
                We believe in the transformative power of God&quot;s love, guiding us to live for His glory and serve others.
              </p>
            </motion.div>

            {/* Highlighted Message */}
            <motion.div
              className="bg-purple-800 text-white p-6 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg sm:text-xl font-semibold text-center">
                “Live for the glory of God and the well-being of others.” - 1 Corinthians 10:31
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Sermon */}
      <Sermon />

      {/* Watch and Listen to Sermons */}
      <Youtube />

      {/* Latest News */}
      <LatestNews />

      {/* Latest Events */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Time:</span> {event.time}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galleries */}
     <Gallery/>
      {/* Connect with Us */}
     

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}