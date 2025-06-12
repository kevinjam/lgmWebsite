"use client";

import { motion } from 'framer-motion';

export default function LatestNews() {
  const news = [
    {
      title: 'Sunday Service Update',
      date: 'June 10, 2025',
      excerpt: 'Join us for our special worship service this Sunday at 10 AM.',
    },
    {
      title: 'Community Outreach',
      date: 'June 12, 2025',
      excerpt: 'Help us serve Nakawuka with our food drive this Saturday.',
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Latest News
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{item.date}</p>
              <p className="text-gray-700 text-sm sm:text-base">{item.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}