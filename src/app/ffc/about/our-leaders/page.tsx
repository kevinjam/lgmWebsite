'use client';

import FFCNav from '@/components/FFCNav';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';


interface Pastor {
  id: string;
  name: string;
  email: string;
  title: string;
  bio: string;
  image: string;
}

export default function OurLeaders() {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch('/api/our-leaders');
        if (!response.ok) throw new Error('Failed to fetch leaders');
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No leaders found');
        }
        setPastors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-t-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-center mt-4">Loading our leaders...</p>
        </div>
      </div>
    );
  }

  if (error || pastors.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">No Leaders Available</h2>
          <p className="text-gray-600 mt-2">
            {error || 'It seems we couldn’t load our leaders at this time. Please try again later or contact us for support.'}
          </p>
          <a href="/contact" className="mt-4 inline-block text-purple-600 hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Leaders - Faith Family Church</title>
        <meta
          name="description"
          content="Meet the dedicated leaders of Faith Family Church guiding our community with faith and wisdom."
        />
      </Head>
      <FFCNav />

      {/* Hero Section */}
      <section className="relative h-72 w-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-[40px] flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Our Leaders
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90 mt-2">
            Guided by faith, serving with love.
          </p>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Pastors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {pastors.map((pastor, index) => (
              <div
                key={pastor.id}
                className={`relative p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  index % 2 === 0 ? 'mt-0' : 'mt-6'
                }`}
              >
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-600 animate-pulse-once">
                  <Image
                    src={pastor.image}
                    alt={`${pastor.name} photo`}
                    width={160}
                    height={160}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{pastor.name}</h3>
                <p className="text-purple-600 text-center mb-2">{pastor.title}</p>
                <p className="text-gray-600 text-center mb-4 line-clamp-3">{pastor.bio}</p>
                <p className="text-center">
                  <a href={`mailto:${pastor.email}`} className="text-purple-600 hover:underline">
                    {pastor.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

// CSS Animation for pulse effect (custom, applied with animate-pulse-once class)
const styles = `
  @keyframes pulseOnce {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .animate-pulse-once {
    animation: pulseOnce 1.5s ease-in-out;
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}