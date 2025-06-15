"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


type SectionKey = 'about' | 'programs' | 'partnerships' | 'challenges-plans' | 'team' | 'join';

export default function StudentMissionSection() {
  const params = useParams();
  const section = params.section as SectionKey;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    interest: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const interests = ['Volunteer', 'Student Leader', 'Fellowship Member', 'Other'];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: '', type: '' });

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.interest) {
      setToast({ message: 'Please fill all fields', type: 'error' });
      setLoading(false);
      return;
    }

    if (!formData.phoneNumber.match(/^\+256\d{9}$/)) {
      setToast({ message: 'Please enter a valid Ugandan phone number (e.g., +256700123456)', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/student-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit form');

      setToast({ 
        message: 'Thank you for your interest! We will contact you soon.', 
        type: 'success' 
      });
      
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        interest: ''
      });
      
      setTimeout(closeModal, 2000);
    } catch (err) {
      console.error('Submission error:', err);
      const errorMessage =
        typeof err === 'object' && err !== null && 'message' in err && typeof (err as Error).message === 'string'
          ? (err as Error).message
          : 'An error occurred. Please try again.';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sections: Record<SectionKey, { title: string; content: React.ReactNode }> = {
    about: {
      title: 'About Student Mission',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Student Mission</h1>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Founded under Latter Glory Ministries in Kabuusu, Rubaga, Kampala, Student Mission (SM) is an interdenominational Christian initiative dedicated to transforming the lives of high school and university students.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    With 73% of Uganda&apos;s population under 30 and 68% under 18, SM focuses on equipping young people to become morally upright, skilled leaders who will steward Uganda&apos;s future with integrity.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/images/sm/student-mission.jpeg"
                  alt="Students in fellowship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )
    },
    programs: {
      title: 'Our Programs',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Programs</h1>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Discipleship', desc: 'Supporting Christian students to deepen their faith through Bible studies, prayer, and mentorship.', icon: '📖' },
                { title: 'Evangelism', desc: 'Training students to share the Gospel in schools and mobilize peers to reach others for Christ.', icon: '🗣️' },
                { title: 'Fellowships', desc: 'Establishing and strengthening school fellowships through leadership training seminars.', icon: '👥' },
                { title: 'Leadership', desc: 'Equipping student leaders with skills through events like our 2017 Kampala training.', icon: '🌟' },
                { title: 'Health Education', desc: 'Providing HIV/AIDS counseling, STI screening, and healthy lifestyle education.', icon: '❤️' },
                { title: 'Career Guidance', desc: 'Offering entrepreneurship lessons and career planning for future success.', icon: '🎯' }
              ].map((program, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3">{program.title}</h3>
                  <p className="text-gray-600 flex-grow">{program.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    partnerships: {
      title: 'Partnerships & Networks',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Partnerships & Networks</h1>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Student Mission spearheaded the Patron&apos;s Network Fellowship (PNF), uniting school patrons to strengthen Christian fellowships across Kampala.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    PNF fosters collaboration, enabling patrons to support students in discipleship and leadership development through regular meetings and resource sharing.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/images/sm/partnerships.jpg"
                  alt="Patron's Network Fellowship meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )
    },
    'challenges-plans': {
      title: 'Challenges & Future Plans',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Challenges & Future Plans</h1>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Post-COVID Challenges</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>School administrators skeptical about born-again church ministries</span></li>
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>Lunch hours reduced to 15 minutes, limiting fellowship time</span></li>
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>Many patrons changed jobs or disengaged from ministry tasks</span></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Current Engagements</h3>
                    <p className="text-gray-600">
                      We&apos;re using counseling as an entry point, with sessions at Kololo High School (June 13 & 18, 2025) and Wakiso Christian School (June 20, 2025).
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Future Plans</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>Expand ministry to universities, a critical decision-making stage</span></li>
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>Enhance media output for social media (YouTube, Instagram)</span></li>
                      <li className="flex items-start"><span className="mr-2 mt-1">•</span><span>Build a robust team of volunteers and members</span></li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/sm/plans.jpg"
                      alt="Planning session"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )
    },
    team: {
      title: 'Our Team',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Led by Pr. Andrew Kisaka, our dedicated team drives Student Mission&apos;s vision forward.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'Pr. Andrew Kisaka',
                'Gracie Tendo Walugembe',
                'Kenneth Ssejjengo',
                'Ruth Balisalamu',
                'Elvis Namanya',
                'Vivian Namulyana',
                'Pr. Ruth Atukunda',
                'Pr. Patrick Karugaba'
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-square w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-purple-100">
                    <Image
                      src="/images/placeholder.jpeg"
                      alt={`${member} portrait`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 24vw"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">{member}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    join: {
      title: 'Join Student Mission',
      content: (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-blue-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join Our Student Mission</h1>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Become part of a movement transforming young lives through faith, leadership, and community service.
              </p>
              <motion.button
                onClick={openModal}
                className="px-8 py-3 bg-white text-purple-700 rounded-lg hover:bg-gray-100 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Involved
              </motion.button>
            </motion.div>
          </div>
        </section>
      )
    }
  };

  if (!sections[section]) {
    notFound();
  }

return (
  <div className="min-h-screen bg-gray-50">
    {/* Main Content */}
    {sections[section].content}

    {/* Centered Modal */}
    {isModalOpen && (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto p-6 sm:p-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 id="modal-title" className="text-xl font-bold text-gray-900">Join Student Mission</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {toast.message && (
            <motion.div
              className={`mb-4 p-3 rounded-lg text-sm ${
                toast.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {toast.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <PhoneInput
                international
                defaultCountry="UG"
                value={formData.phoneNumber}
                onChange={(value) => setFormData({ ...formData, phoneNumber: value ?? '' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
                inputClassName="!border-none !focus:ring-0 w-full"
                countrySelectProps={{ className: "!border-none !focus:ring-0" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                aria-required="true"
              >
                <option value="">Select an option</option>
                {interests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                aria-label={loading ? 'Submitting form' : 'Submit form'}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )}
  </div>
);
}