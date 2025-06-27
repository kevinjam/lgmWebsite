// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline", // Use the offline page when the user is offline
  },
});

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    MTN_MOMO_API_KEY: process.env.MTN_MOMO_API_KEY,
  },
  images: {
    domains: ["imageplaceholder.net","img.youtube.com"], // Add the external domain here
  },
});