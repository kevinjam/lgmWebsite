"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">


      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Student Mission
          </motion.h1>
          <Image
            src="/images/student-mission/hero.jpg"
            alt="Student Mission Hero"
            width={1200}
            height={400}
            className="rounded-lg mx-auto object-cover"
            placeholder="blur"
            blurDataURL="/images/student-mission/hero-placeholder.png"
            loading="lazy"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            About Student Mission
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 mb-4">
                Founded under Latter Glory Ministries in Kabuusu, Rubaga, Kampala, Student Mission (SM) is an interdenominational Christian initiative dedicated to transforming the lives of high school and university students. With 73% of Uganda’s population under 30 and 68% under 18, SM focuses on equipping young people to become morally upright, skilled leaders.
              </p>
              <p className="text-gray-600">
                Our vision is to build a generation that stewards Uganda’s future with integrity. Our mission is to mentor students to maximize their potential through discipleship, leadership training, and community engagement.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/student-mission/about.jpg"
                alt="Students in fellowship"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                placeholder="blur"
                blurDataURL="/images/student-mission/about-placeholder.png"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;