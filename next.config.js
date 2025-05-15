/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Disable ESLint during production builds
  eslint: {
    // Warning instead of error (production builds won't fail)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 