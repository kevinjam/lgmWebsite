"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-white py-8 relative overflow-hidden">
      {/* Decorative Cross */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="4">
          <path d="M50,10 L50,30 M50,50 L50,90 M10,50 L30,50 M70,50 L90,50" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2 items-start">
        {/* Ministry Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-white">Latter Glory Ministries</h3>
          <p className="text-white text-sm leading-relaxed max-w-md">
            Since July 2000, LGM has been preparing believers for Christ’s return through worship, discipleship, and revival.
          </p>
          <div className="mt-4">
            <Link
              href="/join-mailing-list"
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-500 transition transform hover:scale-105"
              aria-label="Join Our Mailing List"
            >
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              Join Our Mailing List
            </Link>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-white">Get in Touch</h3>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-white" />
              <span>Latter Glory Ministry, Kampala, Uganda Gomotoka Road</span>
            </li>
            <li className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-white" />
              <a href="mailto:info@latterglory.ug" className="hover:text-white transition">
                info@latterglory.ug
              </a>
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-white" />
              <a href="tel:+2560392175191" className="hover:text-white transition">
                (256) 392-175-191
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/LGMUG"
              aria-label="Facebook"
              className="text-white hover:text-white transition transform hover:scale-110"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/LGM_UG"
              aria-label="Twitter"
              className="text-white hover:text-white transition transform hover:scale-110"
            >
              <TwitterIcon className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center text-white text-sm">
        <p>© 2025 Latter Glory Ministries. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Custom SVG icons for social media
type IconProps = {
  className?: string;
};

function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

function TwitterIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}