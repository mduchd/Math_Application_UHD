/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kid-elearning/types'],
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Polling keeps Fast Refresh reliable when Windows file-change events are delayed.
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        poll: 1000,
      };
    }

    return config;
  },
};

export default nextConfig;
