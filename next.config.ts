// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
        port: '',        // empty string matches default port 443
        pathname: '/**', // all paths under this host
      },
      // add more hosts here if needed:
      // {
      //   protocol: 'https',
      //   hostname: 'images.ctfassets.net',
      //   port: '',
      //   pathname: '/**',
      // },
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
