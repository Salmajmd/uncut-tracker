/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['srxjkxxuhulqpmtxedbl.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
