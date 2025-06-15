"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FFCNav from '@/components/FFCNav';

export default function Volunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <FFCNav />
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-purple-900 to-purple-700 text-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Volunteer with Us
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Serve God’s people and grow in faith through our ministries.
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white/90 rounded-lg p-6 sm:p-8 shadow-lg border border-purple-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              Serve with Us in Faith
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Join our church family to volunteer and make a difference. Click below to get started!
            </p>
            <motion.button
              onClick={openModal}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Volunteer
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Outreach</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Help with community events, food drives, and worship support.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Mission</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Assist in missionary trips and support for international churches.
            </p>
          </motion.div>
        </div>
        <p className="mt-6 text-center text-gray-700 text-sm sm:text-base">
          Contact us at +256 782 664 592 or email info@lattergloryministries.org for more details.
        </p>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          open
          className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 overflow-auto"
          aria-labelledby="modal-title"
          aria-modal="true"
          role="dialog"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-auto shadow-2xl transform transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                Volunteer Form
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none focus:outline-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <VolunteerForm closeModal={closeModal} setToast={setToast} />
          </motion.div>
        </dialog>
      )}

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 p-3 rounded-lg text-white text-sm transition-opacity duration-300 ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } ${toast.message ? 'opacity-100' : 'opacity-0'}`}
          onAnimationEnd={() => setToast({ message: '', type: '' })}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function VolunteerForm({ closeModal, setToast }: { closeModal: () => void; setToast: (toast: { message: string; type: string }) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !phoneNumber || !location || !skills || !availability) {
      setToast({ message: 'Please fill all fields.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phoneNumber, location, skills, availability }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setToast({ message: 'Volunteer request submitted! We’ll contact you soon.', type: 'success' });
      setName('');
      setEmail('');
      setPhoneNumber('');
      setLocation('');
      setSkills('');
      setAvailability('');
      setTimeout(closeModal, 2000); // Close modal after 2s
    } catch {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
          placeholder="John Doe"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
          placeholder="you@example.com"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
          placeholder="+12025550123"
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
          placeholder="City, Country"
          required
        />
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
          placeholder="e.g., Teaching, Music, Organizing"
          required
        />
      </div>
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        <textarea
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm h-16 resize-none"
          placeholder="e.g., Weekends, Evenings"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={closeModal}
          className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-700"
          aria-label="Close form"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
          aria-label="Submit volunteer form"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}