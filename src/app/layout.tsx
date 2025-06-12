"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import MenuComponent from '../components/Menu';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get current pathname
  const isFFCRoute = pathname.startsWith('/ffc'); // Check if route is under /ffc

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#790da3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {/* Vision Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 text-sm sm:text-base">
            <span className="flex items-center space-x-2 mb-2 sm:mb-0">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>We are an interdenominational congregation of Christ-like believers</span>
            </span>
            <div className="flex space-x-4 hidden sm:flex">
              <Link href="https://www.facebook.com/LGMUG" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" />
                </svg>
              </Link>
              <Link href="https://x.com/FFC_LGM" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </Link>
              <Link href="https://www.instagram.com/lgm_ug/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link href="https://www.youtube.com/@lattergloryministries3882" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.505 6.205a31.462 31.462 0 00-.501 5.907c0 2.001.168 3.949.501 5.907a3.007 3.007 0 002.088 2.088c1.879.501 9.396.501 9.396.501s7.507 0 9.396-.501a3.007 3.007 0 002.088-2.088c.333-1.958.501-3.906.501-5.907 0-2-1.168-3.949-.501-5.907zM9.597 15.601v-6.8l6.4 3.4-6.4 3.4z" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.section>
<Script
          src="https://checkout.flutterwave.com/v3.js"
          strategy="beforeInteractive"
        />
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-purple-800 shadow-md">
          {!isFFCRoute && <MenuComponent />} {/* Render MenuComponent only for non-FFC routes */}
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}