/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me', 'naresh-bohara.com.np'],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

module.exports = nextConfig;
