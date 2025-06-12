"use client";

import { motion } from 'framer-motion';

export default function Youtube() {
  const sermons = [
    { title: 'Faith in Action', videoId: 'dQw4w9WgXcQ' }, // Replace with actual IDs
    { title: 'God’s Promises', videoId: 'dQw4w9WgXcQ' },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Watch Our Sermons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sermons.map((sermon, index) => (
            <motion.div
              key={index}
              className="relative w-full h-48 sm:h-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${sermon.videoId}`}
                title={sermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}