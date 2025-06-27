"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon, HeartIcon, ShieldCheckIcon, SparklesIcon, SunIcon, EyeIcon, ChevronRightIcon, FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import HeroSlider from '../components/HeroSlider';

interface Scripture {
  _id: string;
  verse: string;
  text: string;
}

interface VisionMission {
  vision: string;
  mission: string;
  mandate:string;
}

interface CoreValue {
  name: string;
  icon: string;
}

interface ImageData {
  src: string;
  alt: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className: string }> } = {
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BookOpenIcon,
  SunIcon,
  EyeIcon,
};

// Image Card Component
const ImageCard = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => (
  <div
    className="relative aspect-[4/3] overflow-hidden rounded-lg shadow cursor-pointer"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`View ${alt} in larger size`}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition hover:scale-105"
      placeholder="blur"
      blurDataURL={`${src}-blur.jpg`}
    />
  </div>
);

// Content Card Component
const ContentCard = ({
  icon,
  title,
  text,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) => (
  <div className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow">
    <div className="mb-2 flex items-center gap-2">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children ? (
      <div className="text-gray-600 text-sm">{children}</div>
    ) : (
      <p className="text-gray-600 text-sm">{text}</p>
    )}
  </div>
);

// Image Modal Component
const ImageModal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll('button');
    const firstElement = focusableElements?.[0];
    if (firstElement && typeof (firstElement as HTMLElement).focus === 'function') {
      (firstElement as HTMLElement).focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && focusableElements) {
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          //firstElement.focus();
        }
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Image preview"
      >
        <button
          className="absolute top-2 right-2 p-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <div className="relative w-full h-[80vh] max-h-[600px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [visionMission, setVisionMission] = useState<VisionMission | null>(null);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const openModal = useCallback((src: string, alt: string) => {
    setSelectedImage({ src, alt });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

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
          {/* <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Theme Scriptures
          </motion.h2> */}
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
      <section className="py-8 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Images */}
            <div className="lg:w-2/5 space-y-4">
              <ImageCard
                src="/images/lgm/2nd-anniversary.png"
                alt="Worship team"
                onClick={() => openModal('/images/lgm/2nd-anniversary.png', 'Worship team')}
              />
            </div>

            {/* Content */}
            <div className="lg:w-3/5">
              {loading ? <p className="text-gray-500">Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
                <div className="space-y-4">
                  <ContentCard icon={<EyeIcon className="h-5 w-5 text-purple-600" />} title="Vision" text={visionMission?.vision} />
                  <ContentCard icon={<FlagIcon className="h-5 w-5 text-purple-600" />} title="Mission" text={visionMission?.mission} />
                  
                  <ContentCard 
  icon={<FlagIcon className="h-5 w-5 text-purple-600" />} 
  title="Mandate"
>
  <ol className="list-decimal list-inside space-y-1 text-gray-700">
    {visionMission?.mandate?.split('\n').map((line, index) => (
      <li key={index}>{line.trim()}</li>
    ))}
  </ol>
<a href="#" className="text-purple-600 hover:underline">view more</a>
</ContentCard>


                </div>
              )}
            </div>
          </div>
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
            Core Values
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
         
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Faith Family Church',
                desc: 'A vibrant community for worship and fellowship.',
                href: '/ffc',
                img: '/images/slider/04.jpg',
              },
              {
                name: 'Student Mission',
                desc: 'Empowering young leaders for Christ.',
                href: '/student-mission',
                img: '/images/sm/student-mission.jpeg',
              },
              {
                name: 'Marketplace Ministry',
                desc: 'Bringing faith to the workplace.',
                href: '/marketplace',
                img: '/images/lgm/community-outreach.png',
              },
            ].map((ministry, index) => (
              <motion.div
                key={ministry.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => openModal(ministry.img, ministry.name)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${ministry.name} image in larger size`}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(ministry.img, ministry.name)}
                >
                  <Image
                    src={ministry.img}
                    alt={ministry.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover transition hover:scale-105"
                    placeholder="blur"
                    blurDataURL={`${ministry.img.split('.')[0]}-placeholder.png`}
                    loading="lazy"
                  />
                </div>
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

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}