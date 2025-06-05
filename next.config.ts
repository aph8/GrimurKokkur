// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

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

  async headers() {
    return [
      {
        // Cache your own “insights/script.js” long‐term
        source: '/insights/script.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache all Next.js static files under /_next/static forever
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
