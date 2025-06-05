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
   * Serve /insights/script.js with a far-future cache header:
   *   Cache-Control: public, max-age=31536000, immutable
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
      // If you want to also cache all Next.js static assets (_next/static),
      // uncomment this block:
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
