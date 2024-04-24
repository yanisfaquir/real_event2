/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: '/',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  output: 'export',
};
