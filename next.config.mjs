/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [{
      protocol: 'https',
      hostname: 'loremflickr.com'
    },
    {
      protocol: 'https',
      hostname: 'firebasestorage.googleapis.com'
    }]
  }
};

export default nextConfig;
