/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for Docker multi-stage build — produces a minimal standalone server
  output: "standalone",
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
