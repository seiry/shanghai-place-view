// This file sets a custom webpack configuration to use your Next.js app
// https://nextjs.org/docs/api-reference/next.config.js/introduction

import million from 'million/compiler'

const millionConfig = {
  // auto: process.env.NO DE_ENV === 'production' ? true : false,
  // if you're using RSC:
  auto: { rsc: true },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // swcMinify: true,
  compiler: {},
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // always respond last result from cache in 60s, but revalidate every 60s
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },

          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=3600',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=60',
          },

          {
            key: 'x-powered-by',
            value: 'IIS 6.0',
          },
        ],
      },
    ]
  },
  // output: 'standalone',
}

export default million.next(nextConfig, millionConfig)
