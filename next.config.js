/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'finess-store.vercel.app'
      }
    ]
  }
}

module.exports = nextConfig
