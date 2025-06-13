'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Use named import
import { XCircleIcon } from '@heroicons/react/24/outline';

interface Ministry {
  _id: string;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  ministry: string;
}

interface JoinMinistryModalProps {
  ministries: Ministry[];
  preselectedMinistry?: string;
}

export function JoinMinistryModal({ ministries, preselectedMinistry }: JoinMinistryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    ministry: preselectedMinistry || '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (preselectedMinistry) {
      setFormData((prev) => ({ ...prev, ministry: preselectedMinistry }));
    }
  }, [preselectedMinistry]);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.ministry) newErrors.ministry = 'Please select a ministry';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const res = await fetch('/api/join-ministry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitMessage('Thank you for joining! We will contact you soon.');
        setFormData({ name: '', email: '', phoneNumber: '', ministry: preselectedMinistry || '' });
        setTimeout(() => setIsOpen(false), 2000);
      } else {
        const { error } = await res.json();
        setSubmitMessage(error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
      >
        Join This Ministry
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Join {formData.ministry || 'a Ministry'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="ministry" className="block text-gray-700 font-semibold mb-2">
                  Select Ministry
                </label>
                <select
                  id="ministry"
                  value={formData.ministry}
                  onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select a ministry</option>
                  {ministries.map((ministry) => (
                    <option key={ministry._id} value={ministry.name}>
                      {ministry.name}
                    </option>
                  ))}
                </select>
                {errors.ministry && <p className="text-red-600 text-sm mt-1">{errors.ministry}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {submitMessage && (
                <p className={`text-sm mt-4 ${submitMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}