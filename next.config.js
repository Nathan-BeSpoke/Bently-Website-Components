
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.bentleymotors.com',
      'bentleymotors.com',
      'placehold.co'
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable React's experimental features
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig