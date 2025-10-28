import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Handle canvas for react-pdf
    config.resolve.alias.canvas = false;

    // Ignore pdfjs-dist worker in webpack
    config.resolve.alias['pdfjs-dist/build/pdf.worker.entry'] = false;

    // Override devtool in development to fix react-pdf compatibility
    // Next.js forces 'eval-source-map' in dev which breaks pdfjs-dist
    // This workaround prevents Next.js from reverting our devtool setting
    if (dev && !isServer) {
      Object.defineProperty(config, 'devtool', {
        get() {
          return 'source-map';
        },
        set() {
          // Prevent Next.js from overriding
        },
      });
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
