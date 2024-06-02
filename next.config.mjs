import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // SWC minification kullanarak
  experimental: {
    forceSwcTransforms: true, // SWC dönüşümlerini zorla
  },
  webpack: (config) => {
    config.resolve.alias['../swagger.json'] = path.join(process.cwd(), 'swagger.json');
    return config;
  },
};

export default nextConfig;
