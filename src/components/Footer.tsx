"use client";

import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
// import { FacebookIcon, TwitterIcon } from './Icons'; // Custom icons (defined below)

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
        {/* Ministry Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Latter Glory Ministries</h3>
          <p className="text-gray-200">
            Founded in July 2000, LGM is dedicated to preparing a glorious bride for the return of Jesus Christ through revival, discipleship, and missions.
          </p>
        </div>
        {/* Navigation Links0 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-200 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/ffc" className="text-gray-200 hover:text-white">
                Faith Family Church
              </Link>
            </li>
            <li>
              <Link href="/sm" className="text-gray-200 hover:text-white">
                Students Mission
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="text-gray-200 hover:text-white">
                Marketplace Ministry
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-gray-200 hover:text-white">
                Donate
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span>123 Faith Avenue, Glory City, GC 12345</span>
            </li>
            <li className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              <a href="mailto:contact@lgm.org" className="text-gray-200 hover:text-white">
                contact@lgm.org
              </a>
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              <a href="tel:+1234567890" className="text-gray-200 hover:text-white">
                (123) 456-7890
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-gray-200 hover:text-white">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-gray-200 hover:text-white">
              <TwitterIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-200">
        <p>© 2025 Latter Glory Ministries. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Custom SVG icons for social media
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

export function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}