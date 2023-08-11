// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
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

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports
