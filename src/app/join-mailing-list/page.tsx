'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, HeartIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  preference: string;
}

export default function JoinMailingList() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        reset();
      } else {
        setMessage(result.error || 'Failed to subscribe');
      }
    } catch (error:unknown) {
      setMessage(
        'An error occurred. Please try again.' +
        ((error instanceof Error) ? error.message : 'Unknown error')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-12">
      {/* Header with Cross Motif */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#9333EA" strokeWidth="4">
            <path d="M50,10 L50,30 M50,50 L50,90 M10,50 L30,50 M70,50 L90,50" />
          </svg>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-purple-400 mt-8"
        >
          Join Our Mailing List
        </motion.h1>
      </div>

      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center"
      >
        {/* <h2 className="text-2xl font-semibold text-blue-900">Welcome to the LGM Family</h2> */}
        <p className="mt-4 text-base text-gray-900 leading-relaxed">
         Join our mailing list to receive uplifting messages, ministry updates, and opportunities to grow in faith as part of our global community.
        </p>
      </motion.section>

      {/* Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Subscription Preference *
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {['Announcements', 'New Product Offers', 'LGM Media', 'FFC', 'Mission', 'GPS'].map((option) => (
                  <label key={option} className="flex items-center text-blue-900 text-sm">
                    <input
                      type="radio"
                      value={option}
                      {...register('preference', { required: 'Please select a preference' })}
                      className="mr-2 text-purple-600 focus:ring-purple-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.preference && (
                <p className="mt-1 text-sm text-red-500">{errors.preference.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-full text-base font-semibold hover:bg-purple-500 transition transform hover:scale-105 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Subscribing...' : 'Join Now'}
            </button>
          </form>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}
            >
              {message}
            </motion.p>
          )}
        </div>
      </motion.section>

      {/* Why Subscribe Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
      >
        <h2 className="text-2xl font-semibold text-blue-900 text-center">Why Join Our Mailing List?</h2>
        <div className="mt-6 space-y-6">
          <div className="flex items-start">
            <HeartIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Uplifting Sermons & Devotionals</h3>
              <p className="text-base text-blue-900">Receive weekly messages to strengthen your faith and inspire your walk with Christ.</p>
            </div>
          </div>
          <div className="flex items-start">
            <BookOpenIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Ministry Updates & Events</h3>
              <p className="text-base text-blue-900">Stay informed about LGM’s revival services, missions, and community gatherings.</p>
            </div>
          </div>
          <div className="flex items-start">
            <UsersIcon className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Join a Global Community</h3>
              <p className="text-base text-blue-900">Connect with believers worldwide through exclusive content and prayer opportunities.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center"
      >
        <p className="text-base text-blue-900 leading-relaxed">
          Together, let’s grow in faith and prepare for the glorious return of our Savior. Join the LGM family today!
        </p>
      </motion.section>
    </div>
  );
}