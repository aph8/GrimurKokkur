// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Tell Next to generate a modern bundle for supported browsers,
  // and optimize polyfills out where possible.
  experimental: {
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          plugin.options.ignoreOrder = true;
        }
      }
    }
    return config;
  },
};

export default nextConfig;
