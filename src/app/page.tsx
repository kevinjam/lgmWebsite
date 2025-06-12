"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon, HeartIcon, ShieldCheckIcon, SparklesIcon, SunIcon, EyeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroSlider from '../components/HeroSlider';

interface Scripture {
  _id: string;
  verse: string;
  text: string;
}

interface VisionMission {
  vision: string;
  mission: string;
}

interface CoreValue {
  name: string;
  icon: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className: string }> } = {
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BookOpenIcon,
  SunIcon,
  EyeIcon,
};

export default function Home() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [visionMission, setVisionMission] = useState<VisionMission | null>(null);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch scriptures
        const scripturesRes = await fetch('/api/scriptures');
        if (!scripturesRes.ok) {
          throw new Error(`Scriptures fetch failed: ${scripturesRes.status}`);
        }
        const scripturesData = await scripturesRes.json();
        console.log('Fetched scriptures:', scripturesData);
        setScriptures(scripturesData);

        // Fetch vision and mission
        const visionMissionRes = await fetch('/api/vision-mission');
        if (!visionMissionRes.ok) {
          throw new Error(`Vision/Mission fetch failed: ${visionMissionRes.status}`);
        }
        const visionMissionData = await visionMissionRes.json();
        console.log('Fetched visionMission:', visionMissionData);
        setVisionMission(visionMissionData);

        // Fetch core values
        const coreValuesRes = await fetch('/api/core-values');
        if (!coreValuesRes.ok) {
          throw new Error(`Core Values fetch failed: ${coreValuesRes.status}`);
        }
        const coreValuesData = await coreValuesRes.json();
        console.log('Fetched coreValues:', coreValuesData);
        setCoreValues(coreValuesData);

        if (scripturesData.length === 0) {
          setError('No scriptures found.');
        }
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        if (err instanceof Error) {
          setError(err.message || 'Could not load data');
        } else {
          setError('Could not load data');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Theme Scriptures */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Theme Scriptures
          </motion.h2>
          {loading && <p className="text-center text-gray-600">Loading scriptures...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!loading && scriptures.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scriptures.map((scripture, index) => (
                <motion.div
                  key={scripture._id}
                  className="relative p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <BookOpenIcon className="absolute top-4 right-4 h-8 w-8 text-purple-300" />
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">{scripture.verse}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{scripture.text}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Calling
          </motion.h2>
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && !visionMission && <p className="text-center text-red-600">{error}</p>}
          {visionMission && (
            <div className="grid gap-6 lg:grid-cols-2 items-start">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 bg-white rounded-xl shadow-md bg-gradient-to-r from-purple-50 to-white">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Vision</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{visionMission.vision}</p>
                </div>
                <div className="flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-purple-400" />
                  <div className="h-px bg-purple-200 flex-1 mx-2"></div>
                  <HeartIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md bg-gradient-to-r from-purple-50 to-white">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Mission</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{visionMission.mission}</p>
                </div>
              </motion.div>
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-64 h-64">
                  <Image
                    src="/images/mission-vision.jpg"
                    alt="Community worship"
                    width={200}
                    height={150}
                    className="absolute top-0 left-0 rounded-xl shadow-md object-cover hover:scale-105 transition-transform"
                    placeholder="blur"
                    blurDataURL="/images/mission-vision-placeholder.png"
                    loading="lazy"
                  />
                  <Image
                    src="/images/mission.jpg"
                    alt="Ministry outreach"
                    width={200}
                    height={150}
                    className="absolute bottom-0 right-0 rounded-xl shadow-md object-cover hover:scale-105 transition-transform"
                    placeholder="blur"
                    blurDataURL="/images/mission-placeholder.png"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Core Values
          </motion.h2>
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && coreValues.length === 0 && <p className="text-center text-red-600">{error}</p>}
          {coreValues.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coreValues.map((value, index) => {
                const IconComponent = iconMap[value.icon] || BookOpenIcon;
                return (
                  <motion.div
                    key={value.name}
                    className="flex items-center p-4 bg-purple-50 rounded-xl shadow-md hover:bg-purple-100 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <IconComponent className="h-10 w-10 text-purple-600 mr-4" />
                    <span className="text-lg font-medium text-gray-800">{value.name}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Ministries */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Ministries
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Faith Family Church',
                desc: 'A vibrant community for worship and fellowship.',
                href: '/ffc',
                img: '/images/ffc.jpg',
              },
              {
                name: 'Student Mission',
                desc: 'Empowering young leaders for Christ.',
                href: '/student-mission',
                img: '/images/student-mission.jpg',
              },
              {
                name: 'Marketplace Ministry',
                desc: 'Bringing faith to the workplace.',
                href: '/marketplace',
                img: '/images/marketplace.jpg',
              },
            ].map((ministry, index) => (
              <motion.div
                key={ministry.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Image
                  src={ministry.img}
                  alt={ministry.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                  placeholder="blur"
                  blurDataURL={`${ministry.img.split('.')[0]}-placeholder.png`}
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{ministry.name}</h3>
                  <p className="text-gray-600 mb-4">{ministry.desc}</p>
                  <Link
                    href={ministry.href}
                    className="text-purple-600 hover:underline flex items-center text-sm font-medium"
                  >
                    Learn More <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}