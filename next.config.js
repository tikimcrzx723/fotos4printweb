/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
  images: {
    domains: ['fotos4printmedia.us-southeast-1.linodeobjects.com', 'getwallpapers.com'],
  },
};

module.exports = nextConfig;
