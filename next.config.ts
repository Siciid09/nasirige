/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'igeforpresident.com', // <-- ADDED THIS BLOCK
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;