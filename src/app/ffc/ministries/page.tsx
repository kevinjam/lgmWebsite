'use client';

import { useEffect, useState } from 'react';
import FFCNav from '@/components/FFCNav';
import { JoinMinistryModal } from './JoinMinistryModal';
import Image from 'next/image';

interface Ministry {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  link: string;
}

export default function Ministries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const res = await fetch('/api/ministries', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch ministries');
        }
        const data = await res.json();
        setMinistries(data);
      } catch (err) {
        console.error('Error fetching ministries:', err);
        setError('Failed to load ministries');
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FFCNav />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FFCNav />
        <div className="text-center py-20">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FFCNav />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {ministries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">No ministries found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <div
                  key={ministry._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={ministry.image}
                      alt={`${ministry.name} image`}
                      fill
                      className="object-cover transition-opacity duration-300 hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="text-4xl p-4 text-white">{ministry.icon}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{ministry.name}</h3>
                    <p className="text-gray-600 mb-4">{ministry.description}</p>
                    <a
                      href={'/ffc/ministries/' + ministry._id}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Get Involved Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you&apos;re passionate about serving children, youth, or global missions, there&apos;s a place for you in our ministries.
          </p>
          <JoinMinistryModal ministries={ministries} />
        </div>
      </section>
    </div>
  );
}