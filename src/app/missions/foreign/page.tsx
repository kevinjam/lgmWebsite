"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ForeignMissions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const videos = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/8NRqB7xmdtc",
      title: "Taiwan Worship Service"
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/1h1xeXsqZ4w",
      title: "Ministry Highlights"
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/N9JCznvzJNM",
      title: "Revival Moments"
    },
    {
      id: 4,
      src: "https://www.youtube.com/embed/I9bY8dlltTY",
      title: "Spiritual Warfare"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-purple-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Global Missions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Transforming lives through international church planting, revival gatherings, and discipleship training.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Video Gallery */}
          <div className="mb-16">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Ministry Highlights
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={video.src}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Taiwan Ministry */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Taiwan Ministry Legacy</h3>
              <p className="text-gray-600 mb-6">
                Pastor Dennis Kasirye established a strong foundation in Taiwan through church planting and revival meetings, documented by Wuchang Christian Church and CT.org.tw.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">Pioneered church planting initiatives</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">Led transformative worship services</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">Established discipleship programs</p>
                </div>
              </div>
            </motion.div>

            {/* Global Impact */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Outreach</h3>
              <p className="text-gray-600 mb-6">
                Our mission extends beyond Taiwan, with active church planting and leadership training across multiple continents.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">Leadership training programs</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">International revival campaigns</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-1">•</div>
                  <p className="ml-3 text-gray-600">Cross-cultural ministry partnerships</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Partner With Us</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Support Our Mission</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <MissionForm closeModal={closeModal} setToast={setToast} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.message && (
        <motion.div
          className={`fixed top-4 right-4 p-4 rounded-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onAnimationEnd={() => setTimeout(() => setToast({ message: '', type: '' }), 3000)}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}

// Mission Form Component
function MissionForm({ closeModal, setToast }: { closeModal: () => void; setToast: (toast: { message: string; type: string }) => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setToast({
      message: 'Thank you for your interest! We will contact you soon.',
      type: 'success'
    });
    closeModal();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          value={form.interest}
          onChange={(e) => setForm({...form, interest: e.target.value})}
          required
        >
          <option value="">Select an option</option>
          <option value="prayer">Prayer Support</option>
          <option value="financial">Financial Partnership</option>
          <option value="volunteer">Volunteer Opportunity</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 disabled:opacity-70"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}