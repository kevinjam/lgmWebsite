"use client";

import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HeroSlide {
  _id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch('/api/hero-slides');
        if (!response.ok) {
          throw new Error(`Failed to fetch slides: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched slides:', data);
        setSlides(data);
      } catch (err: unknown) {
        console.error('Fetch slides error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Could not load slides');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
  };

  return (
    <section className="relative h-[50vh] sm:h-[70vh] w-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-64 h-8 bg-gray-300 rounded mb-4"></div>
            <div className="w-96 h-6 bg-gray-300 rounded mb-6"></div>
            <div className="w-32 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}
      {!loading && slides.length === 0 && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600 text-center">No slides available</p>
        </div>
      )}
      {slides.length > 0 && (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide._id || index} className="relative h-[50vh] sm:h-[70vh] w-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-50"
                  priority={index === 0} // Preload first slide
                  placeholder="blur"
                  blurDataURL="/images/slider/placeholder.jpg" // Generic placeholder
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.ctaHref}
                      className="bg-purple-800 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-900 transition"
                      aria-label={slide.ctaText}
                    >
                      {slide.ctaText}
                    </Link>
                  </motion.div>
                </div>
                {/* QR Code in Bottom-Right Corner */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white p-3 rounded-lg shadow-lg flex flex-col items-center z-20">
                  <p className="text-gray-900 text-xs sm:text-sm font-medium mb-2">
                    Register for Silver Jubilee
                  </p>
                  <QRCode
                    value="https://www.latterglory.ug/registration"
                    size={80}
                    bgColor="#FFFFFF"
                    fgColor="#790DA3"
                    level="H"
                  />
                  <Link
                    href="/registration"
                    className="text-purple-600 hover:underline text-xs sm:text-sm mt-2"
                  >
                    Go to Form
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
}