"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MarketPlaceMinistry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-purple-900 to-blue-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="relative max-w-5xl mx-auto">
                <motion.h1
                  className="text-4xl sm:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                   Market Place Ministry
                </motion.h1>
                <motion.p
                  className="text-lg text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
          Empowering believers to transform workplaces with Christian values, led by Pastor Dennis Kasirye through discipleship and leadership.
                </motion.p>
              </div>
            </section>
    

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Discipleship in the Workplace</h3>
            <p className="text-gray-600 text-base md:text-lg mb-4">
              Equipping employees and entrepreneurs with biblical principles to influence their industries for Christ.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Leadership Development</h3>
            <p className="text-gray-600 text-base md:text-lg mb-4">
              Training marketplace leaders to integrate faith, ethics, and innovation in business practices.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Community Impact</h3>
            <p className="text-gray-600 text-base md:text-lg mb-4">
              Supporting local businesses and charities to foster economic growth and spiritual renewal.
            </p>
          </motion.div>
        </div>
        {/* <div className="mt-16 text-center">
          <motion.button
            onClick={openModal}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Market Place Ministry
          </motion.button>
        </div> */}
      </section>

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
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto shadow-2xl transform transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="modal-title" className="text-xl md:text-2xl font-semibold text-gray-900">
                Join Market Place Ministry
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none focus:outline-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <MarketPlaceForm closeModal={closeModal} setToast={setToast} />
          </motion.div>
        </dialog>
      )}

      {toast.message && (
        <motion.div
          className={`fixed top-4 right-4 p-3 rounded-lg text-white text-sm md:text-base transition-opacity duration-300 ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } ${toast.message ? 'opacity-100' : 'opacity-0'}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: toast.message ? 1 : 0 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationEnd={() => setToast({ message: '', type: '' })}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}

function MarketPlaceForm({ closeModal, setToast }: { closeModal: () => void; setToast: (toast: { message: string; type: string }) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', occupation: '', location: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', occupation: '', location: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
      isValid = false;
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/market-place-ministry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, occupation, location }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setToast({ message: 'Thank you for joining! We’ll contact you soon.', type: 'success' });
      setName('');
      setEmail('');
      setOccupation('');
      setLocation('');
      setErrors({ name: '', email: '', occupation: '', location: '' });
      setTimeout(closeModal, 2000);
    } catch {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
          placeholder="John Doe"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby="name-error"
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
          placeholder="you@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="occupation" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
          placeholder="e.g., Entrepreneur, Teacher"
          aria-invalid={errors.occupation ? 'true' : 'false'}
          aria-describedby="occupation-error"
        />
        {errors.occupation && <p id="occupation-error" className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
      </div>
      <div>
        <label htmlFor="location" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
          placeholder="e.g., Kampala, Uganda"
          aria-invalid={errors.location ? 'true' : 'false'}
          aria-describedby="location-error"
        />
        {errors.location && <p id="location-error" className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm md:text-base"
          aria-label="Close form"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium text-sm md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label="Submit market place ministry form"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}