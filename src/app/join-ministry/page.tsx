"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function JoinMinistry() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ministry, setMinistry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const ministries = ['Worship Team', 'Youth Ministry', 'Children’s Ministry', 'Outreach Team', 'Prayer Group'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !email || !phoneNumber || !ministry) {
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
      const response = await fetch('/api/join-ministry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phoneNumber, ministry }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess('Thank you for joining! We’ll contact you soon.');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMinistry('');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-purple-900 to-purple-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join a Ministry
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Become part of our mission to spread the gospel and serve communities. Join a ministry today!
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for contrast */}
      </section>

      {/* Form Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign Up</h2> */}
            {success && (
              <motion.div
                className="mb-5 p-3 bg-green-100 text-green-700 rounded-lg text-center text-base"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                className="mb-5 p-3 bg-red-100 text-red-700 rounded-lg text-center text-base"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base"
                  placeholder="John Doe"
                  aria-label="Full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base"
                  placeholder="+256700123456"
                  aria-label="Phone number"
                  pattern="^\+256\d{9}$"
                  required
                />
              </div>
              <div>
                <label htmlFor="ministry" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Ministry
                </label>
                <select
                  id="ministry"
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base appearance-none bg-white"
                  aria-label="Select ministry"
                  required
                >
                  <option value="" disabled>Select a ministry</option>
                  {ministries.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-base mx-auto block"
                aria-label="Join ministry"
              >
                {loading ? 'Submitting...' : 'Join Now'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}