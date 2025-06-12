"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define Flutterwave response interface
interface FlutterwaveResponse {
  status: string;
  transaction_id: string;
  tx_ref: string;
  [key: string]: unknown;
}

// Extend Window interface for FlutterwaveCheckout
interface FlutterwaveWindow extends Window {
  FlutterwaveCheckout?: (config: {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: { email: string; name: string };
    customizations: { title: string; description: string; logo: string };
    callback: (response: FlutterwaveResponse) => void;
    onclose: () => void;
  }) => void;
}

export default function Donate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      setLoading(false);
      return;
    }

    try {
      const txRef = `LGM-DON-${Math.floor(Math.random() * 1000000000)}`;

      if (typeof window !== 'undefined' && (window as FlutterwaveWindow).FlutterwaveCheckout) {
        (window as FlutterwaveWindow).FlutterwaveCheckout?.({
          public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-YOUR_PUBLIC_KEY',
          tx_ref: txRef,
          amount: Number(amount),
          currency: 'UGX',
          payment_options: 'card,mobilemoney,ussd,banktransfer',
          customer: {
            email: email || 'anonymous@lgm.org',
            name: name || 'Anonymous',
          },
          customizations: {
            title: 'Latter Glory Ministries',
            description: 'Donation to support our mission',
            logo: '/logo/logo.png',
          },
          callback: async (response: FlutterwaveResponse) => {
            if (response.status === 'successful') {
              try {
                const saveResponse = await fetch('/api/donation', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: name || 'Anonymous',
                    email: email || null,
                    amount: Number(amount),
                    message: message || null,
                    txRef,
                    status: 'success',
                  }),
                });

                if (!saveResponse.ok) {
                  throw new Error('Failed to save donation');
                }

                setSuccess('Thank you for your generous donation! Your support empowers us to spread the gospel and uplift communities.');
                setName('');
                setEmail('');
                setAmount('');
                setMessage('');
              } catch (saveError: unknown) {
                console.error('Failed to save donation:', saveError);
                setError('Payment successful, but failed to save donation. Please contact support.');
              }
            } else {
              setError('Payment failed. Please try again.');
            }
            setLoading(false);
          },
          onclose: () => {
            setLoading(false);
          },
        });
      } else {
        setError('Flutterwave script not loaded. Please refresh the page.');
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error('Donation error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Give to Transform Lives
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your donation to Latter Glory Ministries fuels our mission to spread the gospel, empower communities, and support those in need. Every gift makes an eternal impact.
          </motion.p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Make a Donation</h2>
            {success && (
              <motion.div
                className="mb-4 p-4 bg-green-100 text-green-700 rounded"
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
                className="mb-4 p-4 bg-red-100 text-gray-700 rounded"
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
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
                  placeholder="John Doe"
                  aria-label="Donor name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount (UGX)
                </label>
                <div className="mt-2 flex space-x-2">
                  {[1000, 5000, 10000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset.toString())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        amount === preset.toString()
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                      aria-label={`Select ${preset} UGX`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                  required
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
                  placeholder="Enter custom amount"
                  aria-label="Donation amount in UGX"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
                  placeholder="Your support means the world..."
                  aria-label="Donation message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                aria-label="Donate now"
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </form>
          </motion.div>

          {/* Impact Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Gift Changes Lives</h3>
            <p className="text-gray-600 mb-6">
              At Latter Glory Ministries, your donation supports:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Spreading the gospel through outreach and media.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Providing food, clothing, and education to the needy.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Building vibrant churches and community programs.</span>
              </li>
            </ul>
            <div className="mt-8">
              <Image
                src="/images/gallery/pastory.png"
                alt="LGM community outreach"
                width={400}
                height={300}
                className="rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>



      {/* Footer */}

    </div>
  );
}