"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';


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
      // Generate unique transaction reference
      const txRef = `LGM-DON-${Math.floor(Math.random() * 1000000000)}`;

      // Initialize Flutterwave checkout
      if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
        (window as any).FlutterwaveCheckout({
          public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-YOUR_PUBLIC_KEY',
          tx_ref: txRef,
          amount: Number(amount),
          currency: 'UGX', // Adjust based on LGM's needs
          payment_options: 'card,mobilemoney,ussd,banktransfer',
          customer: {
            email: email || 'anonymous@lgm.org',
            name: name || 'Anonymous',
          },
          customizations: {
            title: 'Latter Glory Ministries',
            description: 'Donation to support our mission',
            logo: 'https://lgm.org/logo.png', // Update with actual logo URL
          },
          callback: async (response: any) => {
            if (response.status === 'successful') {
              // Save donation to MongoDB via API
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

                setSuccess('Thank you for your generous donation! Your support helps us spread faith and support the needy.');
                setName('');
                setEmail('');
                setAmount('');
                setMessage('');
              } catch (saveError) {
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
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-purple-800 shadow-md">
        {/* <FFCNav /> */}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-100 to-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Support Latter Glory Ministries
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your generous donation helps us spread the gospel, support the needy, and build a stronger community. Every gift, big or small, makes a difference.
            </motion.p>
          </div>

          {/* Donation Form */}
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            {success && (
              <motion.div
                className="mb-4 p-4 bg-green-100 text-green-800 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                role="alert"
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                className="mb-4 p-4 bg-red-100 text-red-800 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                role="alert"
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
                  className="mt-1 w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-600"
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
                  className="mt-1 w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-600"
                  aria-label="Donor email"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount (UGX)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                  required
                  className="mt-1 w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-600"
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
                  className="mt-1 w-full p-2 border-2 border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-600"
                  aria-label="Donation message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                aria-label="Donate now"
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}