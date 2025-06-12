"use client";

import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'react-qr-code'; // Import QRCode component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HeroSlider() {
  const slides = [
    {
      image: '/images/slider/01.jpg',
      title: 'Welcome to Latter Glory Ministries',
      subtitle: 'A glorious bride ready for the return of Jesus Christ.',
      cta: { text: 'Support Our Mission', href: '/donate' },
    },
    {
      image: '/images/slider/02.jpg',
      title: 'Empowering Believers',
      subtitle: 'Equipping the saints for service and revival.',
      cta: { text: 'Join a Ministry', href: '/ffc' },
    },
    {
      image: '/images/slider/03.jpg',
      title: 'Revealing God’s Heart',
      subtitle: 'Spreading faith, hope, and love worldwide.',
      cta: { text: 'Learn More', href: '/about' },
    },
  ];

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
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[50vh] sm:h-[70vh] w-full">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="brightness-50"
              priority={index === 0} // Preload first slide
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
                  href={slide.cta.href}
                  className="bg-purple-800 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-900 transition"
                  aria-label={slide.cta.text}
                >
                  {slide.cta.text}
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
        ))}
      </Slider>
    </section>
  );
}