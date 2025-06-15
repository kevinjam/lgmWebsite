"use client"

import { useState } from 'react';
import FFCNav from '@/components/FFCNav';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { E164Number } from 'libphonenumber-js/core';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  function setPhoneNumber(value: string | E164Number) {
    setValue('phone', value as string);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FFCNav />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2270%22 height=%2270%22 viewBox=%220 0 70 70%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h70v70H0V0zm10 10h50v50H10V10z%22 stroke=%22%23ffffff%22 stroke-width=%221%22 fill=%22none%22 fill-rule=%22evenodd%22/%3E%3C/svg%22)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
              We&apos;d love to hear from you. Reach out for prayer, questions, or to learn more about our ministries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  At Latter Glory Ministries, we&apos;re here to support you in your spiritual journey. Contact us for inquiries, prayer requests, or to learn more about our ministries.
                </p>
              </div>

              <div className="space-y-6">
                {/* Contact Info Cards */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Our Location</h3>
                      <p className="text-gray-600">Rubaga, Kampala, Uganda</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Email Us</h3>
                      <a href="mailto:info@latterglory.ug" className="text-purple-600 hover:underline">
                        info@latterglory.ug
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Call Us</h3>
                      <a href="tel:+256392175191" className="text-purple-600 hover:underline">
                        +256 392-175-191
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div>
  <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    {[
      { 
        name: 'Facebook', 
        icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z',
        url: 'https://www.facebook.com/LGMUG'
      },
      { 
        name: 'Twitter (X)', 
        icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
        url: 'https://x.com/LGM_UG'
      },
      { 
        name: 'Instagram', 
        icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
        url: 'https://www.instagram.com/lgm_ug'
      },
      { 
        name: 'YouTube', 
        icon: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.505 6.205a31.462 31.462 0 00-.501 5.907c0 2.001.168 3.949.501 5.907a3.007 3.007 0 002.088 2.088c1.879.501 9.396.501 9.396.501s7.507 0 9.396-.501a3.007 3.007 0 002.088-2.088c.333-1.958.501-3.906.501-5.907 0-2-1.168-3.949-.501-5.907zM9.597 15.601v-6.8l6.4 3.4-6.4 3.4z',
        url: 'https://www.youtube.com/@lattergloryministries3882'
      }
    ].map((social) => (
      <motion.a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label={social.name}
      >
        <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
          <path d={social.icon} />
        </svg>
      </motion.a>
    ))}
  </div>
</div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
                >
                  Thank you for your message! We&apos;ll get back to you soon.
                </motion.div>
              )}
              
              {submitError && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg"
                >
                  {submitError}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email"
                      }
                    })}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>

 <PhoneInput
          international
          defaultCountry="UG"
        
          onChange={value => setPhoneNumber(value || '')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
          inputClassName="!border-none !focus:ring-0 w-full"
          countrySelectProps={{ className: "!border-none !focus:ring-0" }}
     
          aria-describedby="phone-error"
        />

               
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", { required: "Message is required" })}
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                    placeholder="Your Message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium text-lg shadow-md"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us at Faith Family Church or one of our satellite churches in Nakawuka or Ntinda.
            </p>
          </motion.div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.243208837614!2d32.541929!3d0.3031678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbcc6e6400001:0xec025891350a6e8c!2sFaith+Family+Church!5e0!3m2!1sen!2sus!4v1715151234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Times</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to welcome you to our services. Here are our weekly gathering times:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                location: "Faith Family Church (Rubaga)",
                time: "Sunday: 9:00 AM EAT",
                description: "Main church service with worship and teaching"
              },
              {
                location: "Nakawuka",
                time: "Sunday: 8:00 AM EAT",
                description: "Community gathering with family-friendly service"
              },
              {
                location: "Ntinda",
                time: "Sunday: 8:00 AM EAT",
                description: "Contemporary worship and biblical teaching"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.location}</h3>
                <p className="text-purple-600 font-medium mb-3">{service.time}</p>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}