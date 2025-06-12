"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';

const JoinPage: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const interests = ['Volunteer', 'Student Leader', 'Fellowship Member', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !email || !phoneNumber || !interest) {
      setError('Please fill all fields.');
      setLoading(false);
      return;
    }

    if (!phoneNumber.match(/^\+256\d{9}$/)) {
      setError('Please enter a valid Ugandan phone number (e.g., +256700123456).');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/student-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phoneNumber, interest }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess('Thank you for your interest! We’ll contact you soon.');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setInterest('');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-800 text-white">
        <div className="max-w-md mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Join Student Mission
          </motion.h2>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {success && (
              <motion.div
                className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-100 text-gray-700 rounded text-sm"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600 text-sm"
                  placeholder="John Doe"
                  aria-label="Full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600 text-sm"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600 text-sm"
                  placeholder="+256700123456"
                  aria-label="Phone number"
                  pattern="^\+256\d{9}$"
                  required
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                  How Would You Like to Get Involved?
                </label>
                <select
                  id="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600 text-sm"
                  aria-label="Select interest"
                  required
                >
                  <option value="" disabled>Select an option</option>
                  {interests.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
                aria-label="Join Student Mission"
              >
                {loading ? 'Submitting...' : 'Join Now'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JoinPage;