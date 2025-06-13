"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Use named importimport { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { JoinMinistryModal } from './JoinMinistryModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Ministry {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  location?: string;
  isActive: boolean;
}

export function MinistryDetailsClient({ ministry }: { ministry: Ministry }) {
  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px]">
        <Image
          src={ministry.image}
          alt={`${ministry.name} image`}
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
            {ministry.name}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-200 mt-4 max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {ministry.description}
          </motion.p>
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
              href="/ffc/ministries"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 text-lg font-semibold transition duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Ministries
            </Link>
            {ministry.isActive && (
              <JoinMinistryModal
                ministries={[ministry]}
                preselectedMinistry={ministry.name}
              />
            )}
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-2">{ministry.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{ministry.name}</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{ministry.description}</p>
              <div className="flex items-center mb-4">
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Status:</span>{' '}
                  {ministry.isActive ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Inactive
                    </span>
                  )}
                </p>
              </div>
              {ministry.location && (
                <motion.div
                  className="mt-8 relative h-64 w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(ministry.location)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}