// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require('@sentry/nextjs')
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

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

export default million.next(nextConfig, millionConfig)
