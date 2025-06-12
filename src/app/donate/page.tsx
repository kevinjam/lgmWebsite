"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import type { NextPage } from 'next';

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

const DonatePage: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFlutterwaveSubmit = async (e: React.FormEvent) => {
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
            logo: '/images/logo.png',
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
                    method: 'Flutterwave',
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
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Support Our Mission
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your generous donation to Latter Glory Ministries helps spread the gospel, uplift communities, and transform lives.
          </motion.p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Donate Online</h2>
            {success && (
              <motion.div
                className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm"
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
                className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            <form onSubmit={handleFlutterwaveSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition text-sm"
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
                  className="mt-1.5 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition text-sm"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount (UGX) <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[1000, 5000, 10000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset.toString())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        amount === preset.toString()
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
                  className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition text-sm"
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
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition text-sm"
                  placeholder="Your support means the world..."
                  aria-label="Donation message"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:bg-gray-800 disabled:cursor-not-allowed transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </motion.button>
            </form>
          </motion.div>

          {/* Alternative Donation Methods */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Other Ways to Donate</h2>

            {/* Call Us */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-3">
                <PhoneIcon className="w-6 h-6 text-purple-600 mr-2" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
              </div>
              <p className="text-gray-600 text-sm">
                For phone donations, please call our dedicated line:
              </p>
              <p className="mt-2 text-purple-600 font-medium text-sm">
                <a href="tel:+256392175191" className="hover:underline">+256 392 175 191</a>
              </p>
            </div>

            {/* MTN MoMo */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-3">
                <CreditCardIcon className="w-6 h-6 text-purple-600 mr-2" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900">Donate via MTN MoMo</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Send your donation to MoMo code <strong>316453</strong>. Follow these steps:
              </p>
              <ol className="text-gray-600 text-sm list-decimal pl-4 space-y-1">
                <li>Dial *165# on your MTN line.</li>
                <li>Select “Payments”.</li>
                <li>Choose “Pay Merchant” and enter code <strong>316453</strong>.</li>
                <li>Enter amount and confirm with your PIN.</li>
                <li>Save the transaction ID from the confirmation SMS.</li>
              </ol>
              <p className="mt-3 text-gray-600 text-sm">
                After sending, please contact us at{' '}
                <a href="tel:+256782664592" className="text-purple-600 hover:underline">+256 782 664 592</a> with your transaction ID to confirm your donation.
              </p>
            </div>

            {/* Bank Account */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-3">
                <BanknotesIcon className="w-6 h-6 text-purple-600 mr-2" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900">Bank Transfer</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Donate directly to our bank account:
              </p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li><strong>Bank:</strong> Standard Chartered Bank</li>
                <li><strong>Account Number:</strong> 0152002456600</li>
                <li><strong>Account Name:</strong> Latter Glory Ministries</li>
                <li><strong>Branch:</strong> Kampala Main Branch</li>
                <li><strong>SWIFT Code:</strong> SCBLUGKA (for international transfers)</li>
                <li><strong>Bank Address:</strong> Plot 5, Speke Road, Kampala, Uganda</li>
              </ul>
              <p className="mt-3 text-gray-600 text-sm">
                For international payments, please include your name and “Donation” in the transfer reference. Contact us at{' '}
                <a href="tel:+256392175191" className="text-purple-600 hover:underline">+256 392 175 191</a> for assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;