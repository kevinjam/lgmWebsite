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
  images: {
    domains: ["imageplaceholder.net","img.youtube.com"], // Add the external domain here
  },
});