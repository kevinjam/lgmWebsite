"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function BookLaunch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    // Load SweetAlert2 script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleShare = () => setIsShareOpen(!isShareOpen);

  const handleVideoClick = () => {
    if (videoRef.current) {
      setIsVideoPlaying(!isVideoPlaying);
      const src = videoRef.current.src;
      videoRef.current.src = isVideoPlaying 
        ? src.replace('autoplay=1', 'autoplay=0') 
        : src.replace('autoplay=0', 'autoplay=1');
    }
  };

  const sharePage = (platform: string) => {
    const url = window.location.href;
    const text = "Check out the upcoming book launch for '[All Yours]' by Pr. Dennis Kasirye!";
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: "Book Launch: [All Yours]",
            text: text,
            url: url
          }).catch(err => console.log('Error sharing:', err));
        } else {
          navigator.clipboard.writeText(url);
          setToast({ message: 'Link copied to clipboard!', type: 'success' });
        }
    }
    setIsShareOpen(false);
  };

  return (
    <>
      <Head>
        <title>Book Launch: [All Yours] by Pr. Dennis Kasirye</title>
        <meta name="description" content="Join us for the launch of '[All Yours]' by Pr. Dennis Kasirye on July 5, 2025. Reserve your signed copy today!" />
        <meta property="og:title" content="Book Launch: [All Yours] by Pr. Dennis Kasirye" />
        <meta property="og:description" content="Join us for the launch of '[All Yours]' by Pr. Dennis Kasirye on July 5, 2025. Reserve your signed copy today!" />
        <meta property="og:image" content="https://example.com/book-cover.jpg" />
        <meta property="og:url" content="https://example.com/book-launch" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Floating Share Button */}
        <div className="fixed right-6 bottom-6 z-40">
          <div className="relative">
            <motion.button
              onClick={toggleShare}
              className="w-14 h-14 rounded-full bg-purple-600 shadow-lg flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share this page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </motion.button>

            {isShareOpen && (
              <motion.div 
                className="absolute right-0 bottom-16 mb-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <button 
                  onClick={() => sharePage('facebook')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                  Facebook
                </button>
                <button 
                  onClick={() => sharePage('twitter')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                  Twitter
                </button>
                <button 
                  onClick={() => sharePage('whatsapp')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 1.397a9.551 9.551 0 01-1.336-.366c-.337-.12-.609-.219-.733-.183-.198.054-.339.16-.447.3-.149.197-.582.723-.713.872-.133.149-.264.165-.495.083-.232-.082-.99-.365-1.882-1.164-1.349-1.25-2.191-2.698-2.413-3.153-.223-.456-.024-.703.168-.925.17-.198.372-.446.558-.669.186-.223.248-.372.372-.619.124-.248.062-.465-.031-.619-.093-.155-.842-1.98-1.147-2.714-.306-.733-.61-.611-.842-.619-.223-.008-.446-.01-.669-.01-.235 0-.564.028-.89.165-.33.139-.578.347-.743.533-.213.223-.4.522-.4 1.182 0 .66.305 1.654.458 2.062.153.407.69 1.318 1.502 2.07.78.722 1.551 1.19 2.431 1.537.66.26 1.316.39 1.958.39.31 0 .615-.021.914-.063.31-.042.613-.111.92-.223.33-.12.63-.264.893-.432.235-.149.423-.347.486-.446.062-.099.042-.186-.02-.26-.061-.074-.223-.198-.465-.347z"/>
                  </svg>
                  WhatsApp
                </button>
                <button 
                  onClick={() => sharePage('')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Link
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-purple-900 to-blue-800 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2270%22 height=%2270%22 viewBox=%220 0 70 70%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h70v70H0V0zm10 10h50v50H10V10z%22 stroke=%22%23ffffff%22 stroke-width=%221%22 fill=%22none%22 fill-rule=%22evenodd%22/%3E%3C/svg%22)]"></div>
          </div>
          
          {/* Floating book cover */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-48 h-64 bg-white shadow-2xl rounded-lg overflow-hidden transform rotate-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl rotate-90">ALL YOURS</span>
            </div>
            <div className="absolute inset-0 border-8 border-white opacity-20"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
                The Journey of Faith
              </h1>
              <p className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Pr. Dennis Kasirye invites you to the launch of his transformative book
              </p>
              
              <motion.div 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-block bg-white text-purple-900 px-6 py-3 rounded-full text-xl font-bold shadow-lg transform rotate-1">
                  &quot;[All Yours]&quot;
                </span>
              </motion.div>
              
              <p className="max-w-3xl mx-auto mt-8 text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                July 5, 2025 • Discover profound insights into spiritual growth and divine relationship
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <motion.button
                  onClick={openModal}
                  className="px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Reserve Signed Copy
                </motion.button>
                
                <motion.button
                  onClick={handleVideoClick}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Trailer
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="flex-shrink-0 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-100 shadow-xl">
                  <Image
                    src="/images/leaders/ps-dennis-kasiry.jpg"
                    alt="Pr. Dennis Kasirye"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="font-bold">Author</span>
                </div>
              </motion.div>
              
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  About <span className="text-purple-600">Pr. Dennis Kasirye</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With over 20 years of ministry experience, Pastor Dennis Kasirye has touched countless lives through his profound teachings and spiritual guidance. His journey of faith has been marked by divine encounters and transformative revelations that he now shares in this powerful book.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  &quot;[All Yours]&quot; represents the culmination of his spiritual journey, offering readers a roadmap to deeper intimacy with God and understanding of divine purpose.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Spiritual Growth</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Divine Relationship</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Faith Journey</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Prelaunch <span className="text-purple-600">Video</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Watch the official trailer for &quot;[All Yours]&quot; and get a glimpse of the spiritual journey that awaits you.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <iframe
                ref={videoRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BNketd_8_Yw?si=xyz&autoplay=0&mute=1"
                title="Book Launch Advert for [All Yours]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
            
            <div className="text-center mt-12">
              <motion.button
                onClick={openModal}
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve Your Signed Copy Now
              </motion.button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What <span className="text-purple-600">Readers Say</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Early reviews from those who have previewed "[All Yours]"
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "This book transformed my prayer life. Pastor Dennis's insights into divine relationship are unparalleled.",
                  author: "Sarah K.",
                  role: "Ministry Leader"
                },
                {
                  quote: "A masterpiece of spiritual literature. Each chapter draws you deeper into understanding God's heart.",
                  author: "Dr. Michael T.",
                  role: "Theologian"
                },
                {
                  quote: "I couldn't put it down! The practical wisdom in these pages is life-changing.",
                  author: "Esther N.",
                  role: "Small Group Leader"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-6 text-purple-500">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Begin Your Spiritual Journey?</h2>
              <p className="text-xl mb-10 max-w-3xl mx-auto">
                Reserve your signed copy of &quot;[All Yours]&quot; today and embark on a transformative experience with God.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={openModal}
                  className="px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reserve Now (UGX 25,000)
                </motion.button>
                <motion.button
                  onClick={toggleShare}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-purple-300 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share With Friends
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 overflow-auto p-4">
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none focus:outline-none"
                aria-label="Close modal"
              >
                ×
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Reserve Your Signed Copy
                </h2>
                <p className="text-gray-600 mt-2">
                  Fill this form to secure your signed copy of &quot;[All Yours]&quot;
                </p>
              </div>
              
              <BookPurchaseForm closeModal={closeModal} setToast={setToast} />
            </motion.div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.message && (
          <motion.div
            className={`fixed top-4 right-4 p-4 rounded-lg text-white text-sm md:text-base shadow-xl z-50 ${
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setTimeout(() => setToast({ message: '', type: '' }), 3000)}
          >
            <div className="flex items-center">
              {toast.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

function BookPurchaseForm({ closeModal, setToast }: { closeModal: () => void; setToast: (toast: { message: string; type: string }) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phoneNumber: '', paymentMethod: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phoneNumber: '', paymentMethod: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
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
      const response = await fetch('/api/book-launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          quantity,
          paymentMethod,
          amount: 25000 * quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process purchase');
      }

      let paymentInstructions = '';
      if (paymentMethod === 'mtn') {
        paymentInstructions = 'To pay for services a customer dials *165*3# to send UGX ' + (25000 * quantity) + ' to MoMo code 316453. Use your name and phone number as reference.';
      } else if (paymentMethod === 'airtel') {
        paymentInstructions = 'Send UGX ' + (25000 * quantity) + ' to +256700123456 (Airtel Money) via *185#. Use your name and phone number as reference.';
      }

      const successMessage = `Thank you, ${name}! ${paymentInstructions} We've sent confirmation details to ${email}. Your signed copy${quantity > 1 ? 'ies' : ''} of "[All Yours]" ${quantity > 1 ? 'are' : 'is'} reserved!`;

      // Show SweetAlert2 modal
      if (window.Swal) {
        window.Swal.fire({
          title: 'Success!',
          html: successMessage,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#471396',
        }).then((result) => {
          if (result.isConfirmed) {
            setToast({ message: successMessage, type: 'success' });
            setName('');
            setEmail('');
            setPhoneNumber('');
            setQuantity(1);
            setPaymentMethod('');
            setErrors({ name: '', email: '', phoneNumber: '', paymentMethod: '' });
            closeModal();
          }
        });
      } else {
        setToast({ message: successMessage, type: 'success' });
        setName('');
        setEmail('');
        setPhoneNumber('');
        setQuantity(1);
        setPaymentMethod('');
        setErrors({ name: '', email: '', phoneNumber: '', paymentMethod: '' });
        closeModal();
      }
    } catch (error) {
      setToast({ message: (error as Error).message || 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
          placeholder="Your full name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby="name-error"
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
          placeholder="your@email.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          international
          defaultCountry="UG"
          value={phoneNumber}
          onChange={value => setPhoneNumber(value || '')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
          inputClassName="!border-none !focus:ring-0 w-full"
          countrySelectProps={{ className: "!border-none !focus:ring-0" }}
          aria-invalid={errors.phoneNumber ? 'true' : 'false'}
          aria-describedby="phone-error"
        />
        {errors.phoneNumber && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'copy' : 'copies'}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method <span className="text-red-500">*</span>
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
          aria-required="true"
        >
          <option value="">Select payment method</option>
          <option value="mtn">MTN Mobile Money (MoMo)</option>
          <option value="airtel">Airtel Money</option>
        </select>
        {errors.paymentMethod && <p id="payment-error" className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-medium">UGX {25000 * quantity}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span className="text-purple-700">UGX {25000 * quantity}</span>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium text-base"
          aria-label="Close form"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !paymentMethod}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-semibold text-base disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center"
          aria-label="Submit book purchase"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            `Pay UGX ${25000 * quantity}`
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        By completing this purchase, you agree to our terms of service. Delivery details will be sent to your email within 24 hours of payment confirmation.
      </p>
    </form>
  );
}