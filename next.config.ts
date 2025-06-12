// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in dev
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost', "imageplaceholder.net","img.youtube.com"],
  },
});

