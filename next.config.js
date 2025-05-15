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
  // Disable TypeScript checking during builds
  typescript: {
    // Warning instead of error (production builds won't fail)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 