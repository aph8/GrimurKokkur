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

  /**
   * Set a one‐year, immutable cache‐control header for /insights/script.js.
   */
  async headers() {
    return [
      {
        source: '/insights/script.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // If you also want to cache Next.js static assets under /_next/static/,
      // uncomment the block below:
      //
      // {
      //   source: '/_next/static/:path*',
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       value: 'public, max-age=31536000, immutable',
      //     },
      //   ],
      // },
    ];
  },
};

export default nextConfig;
