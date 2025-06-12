"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  const scriptures = [
    {
      verse: 'Haggai 2:9',
      text: '“The glory of this present house will be greater than the glory of the former house,” says the Lord Almighty. “And in this place, I will grant peace,” declares the Lord Almighty.',
    },
    {
      verse: 'Isaiah 40:5',
      text: '“And the glory of the Lord will be revealed, and all people will see it together. For the mouth of the Lord has spoken.”',
    },
    {
      verse: 'Matthew 9:35-38',
      text: 'And Jesus went about all the cities and villages, teaching in their synagogues, and preaching the gospel of the kingdom... Pray ye therefore the Lord of the harvest, that he will send forth labourers into his harvest.',
    },
  ];

  const coreValues = ['Love', 'Faith', 'Humility', 'Reverence for God', 'Holiness', 'Seeking God'];

  return (
    <div className="bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Theme Scriptures */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Our Theme Scriptures
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {scriptures.map((scripture, index) => (
              <motion.div
                key={scripture.verse}
                className="p-6 bg-gray-50 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  {scripture.verse}
                </h3>
                <p className="text-gray-600">{scripture.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Calling</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Since July 2000, Latter Glory Ministries has been dedicated to reaching all people, empowering and discipling believers, revealing the heart of God, and causing revival and restoration.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Vision</h3>
              <p className="text-gray-600">
                A glorious bride ready for the return of Jesus Christ.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mission</h3>
              <p className="text-gray-600">
                To reach all people, empower and disciple believers, revealing the heart of God, causing revival and restoration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Core Values</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {coreValues.map((value, index) => (
              <motion.span
                key={value}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {value}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Our Ministries
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Faith Family Church
              </h3>
              <p className="text-gray-600 mb-4">
                A vibrant community for worship and fellowship.
              </p>
              <Link
                href="/ffc"
                className="text-purple-800 hover:underline flex items-center"
              >
                Learn More <ChevronRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Students Mission
              </h3>
              <p className="text-gray-600 mb-4">
                Empowering young leaders for Christ.
              </p>
              <Link
                href="/sm"
                className="text-purple-800 hover:underline flex items-center"
              >
                Learn More <ChevronRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Marketplace Ministry
              </h3>
              <p className="text-gray-600 mb-4">
                Bringing faith to the workplace.
              </p>
              <Link
                href="/marketplace"
                className="text-purple-800 hover:underline flex items-center"
              >
                Learn More <ChevronRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}