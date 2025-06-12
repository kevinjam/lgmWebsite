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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join a Ministry
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Become part of our mission to spread the gospel and serve communities. Join a ministry today!
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Sign Up</h2>
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
                <label htmlFor="ministry" className="block text-sm font-medium text-gray-700">
                  Select Ministry
                </label>
                <select
                  id="ministry"
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600 text-sm"
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
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
                aria-label="Join ministry"
              >
                {loading ? 'Submitting...' : 'Join Now'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
}