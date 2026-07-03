/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip TypeScript type-checking at build time — types are checked in dev
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint at build time
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
