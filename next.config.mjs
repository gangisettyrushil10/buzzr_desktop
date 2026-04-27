/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    // iOS requires apple-app-site-association to be served as application/json
    // (no extension). Without an explicit Content-Type header, Vercel serves it
    // as octet-stream and iOS silently rejects it.
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        pathname: '/i/teamlogos/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
