"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Sermon() {
  const sermon = {
    title: 'The Power of Faith',
    date: 'June 8, 2025',
    speaker: 'Pastor Andrew Kisaka',
    description: 'Discover how faith can transform your life and community through this inspiring message.',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    thumbnail: '/images/sermons/sermon01.jpg', // Fallback image
    bio: 'Pastor Andrew Kisaka is the lead pastor of Faith Family Church, dedicated to spreading God’s love.',
  };

  // Use YouTube thumbnail if no custom thumbnail is provided
  const thumbnailUrl = sermon.thumbnail || `https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`;

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Sermon
        </h2>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            {/* Thumbnail */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto">
              <Image
                src={thumbnailUrl}
                alt={sermon.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-t-lg md:rounded-none"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-opacity duration-300" />
              <PlayCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            {/* Content */}
            <div className="p-6 md:w-1/2">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {sermon.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Date:</span> {sermon.date}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Speaker:</span> {sermon.speaker}
              </p>
              <p className="text-gray-700 text-sm sm:text-base mb-4">{sermon.description}</p>
              <p className="text-gray-600 text-sm italic mb-4">{sermon.bio}</p>
              <Link
                href={`/ffc/sermons/${sermon.videoId}`}
                className="inline-flex items-center bg-purple-800 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-900 transition"
                aria-label={`Watch ${sermon.title}`}
              >
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Watch Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    );
}