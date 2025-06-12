"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroSlider from '../../components/HeroSlider';
import Footer from '../../components/Footer';
import Sermon from '../../components/Sermon';
import LatestNews from '../../components/LatestNews';
import Youtube from '../../components/Youtube';
import FFCNav from '../../components/FFCNav';
import { CalendarIcon, UsersIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function FFCHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide for fallback slider (not used since HeroSlider is reused)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const slides = [
    {
      image: '/images/slider/01.jpg',
      title: 'Welcome to Faith Family Church',
      subtitle: 'A vibrant community growing in faith and love.',
      cta: { text: 'Join Us Sunday', href: '/ffc/events' },
    },
    {
      image: '/images/slider/02.jpg',
      title: 'Experience God’s Presence',
      subtitle: 'Worship with us and encounter His glory.',
      cta: { text: 'Plan Your Visit', href: '/ffc/visit' },
    },
  ];

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

  const galleryImages = [
    '/images/gallery/ffc01.jpg',
    '/images/gallery/ffc02.jpg',
    '/images/gallery/ffc03.jpg',
    '/images/gallery/ffc04.jpg',
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
            "{nextEvent.title}" - {nextEvent.pastor}, {nextEvent.time} - {nextEvent.location}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">God’s Love</h3>
              <h4 className="text-sm font-medium text-purple-800 mb-2">Our Beliefs</h4>
              <p className="text-gray-700 text-sm">
                We believe in the transformative power of God’s love, guiding us to live for His glory and serve others.
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
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Community in Action
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative w-full h-40 sm:h-48">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Us */}
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-lg sm:text-xl text-gray-900 mb-6 text-center">
            Connect with Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Have a Question */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/images/gallery/ffc01.jpg"
                  alt="Have a Question"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Have a Question?</h3>
              <p className="text-gray-700 text-sm mb-4">Our team is here to assist you.</p>
              <Link href="/ffc/contact">
                <button className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-900 transition">
                  Contact Us
                </button>
              </Link>
            </motion.div>

            {/* Want to Stay in the Loop */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/images/gallery/ffc02.jpg"
                  alt="Stay in the Loop"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay in the Loop</h3>
              <p className="text-gray-700 text-sm mb-4">Subscribe to our newsletter and follow us on social media.</p>
              <Link href="/subscribe-tvn">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
                  Subscribe
                </button>
              </Link>
              <p className="text-gray-600 text-sm mt-2">Join our community:</p>
              <div className="flex space-x-2 mt-2">
                <a href="https://facebook.com/lgffc" target="_blank" aria-label="Facebook">
                  <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition">
                    Facebook
                  </button>
                </a>
                <a href="https://instagram.com/lgffc" target="_blank" aria-label="Instagram">
                  <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition">
                    Instagram
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Sidebar Navigation */}
            <motion.div
              className="bg-purple-600 rounded-lg shadow-md text-white p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Explore</h4>
                <Link href="/ffc/events" className="block text-sm hover:underline">Events</Link>
                <Link href="/ffc/contact" className="block text-sm hover:underline">Contact Us</Link>
                <Link href="/sm" className="block text-sm hover:underline">Student Mission</Link>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">Locations</h4>
                <Link href="/ffc/ntinda" className="block text-sm hover:underline">Ntinda</Link>
                <Link href="/ffc/nakawuka" className="block text-sm hover:underline">Nakawuka</Link>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">Ministries</h4>
                <Link href="/ffc/ministries/youth" className="block text-sm hover:underline">Youth</Link>
                <Link href="/ffc/ministries/children" className="block text-sm hover:underline">Children</Link>
                <Link href="/ffc/ministries/married" className="block text-sm hover:underline">Married Couples</Link>
              </div>
              <div className="mt-4 space-y-2">
                <Link href="/ffc/services" className="block text-sm hover:underline flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Join Us In-Person
                </Link>
                <Link href="https://radio.latterglory.com/ffc" target="_blank" className="block text-sm hover:underline flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 12h18m-7 7h7" />
                  </svg>
                  Join Us Online
                </Link>
                <Link href="/ffc/give" className="block text-sm hover:underline flex items-center">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Give Online
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}