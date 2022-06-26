import ProgressBar from '@badrap/bar-of-progress'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import '../lib/dayjs.init'
import { Eruda } from '../components/Eruda'

import 'tailwindcss/tailwind.css'
import '../lib/dayjs.init'
import '../styles/animation.css'
import '../styles/globals.css'
import '../styles/header.scss'
import '../styles/utilities.css'
// import { GlobalLayout } from '../components/layout/GlobalLayout'
import {
  closeSideBarWhenCould,
  GlobalLayout,
} from '../components/layout/GlobalLayout'

const progress = new ProgressBar({
  size: 2,
  color: '#f1f8f9',
  className: 'bar-of-progress',
  delay: 100,
})

if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => {
  progress.start()
  closeSideBarWhenCould()
})

Router.events.on('routeChangeComplete', () => {
  progress.finish()
  document?.querySelector('#scrollContainer')?.scrollTo(0, 0)
})

Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="renderer" content="webkit" />
        <meta name="theme-color" content="#3a3f51" />

        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fastly.jsdelivr.net/combine/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.css,npm/prismjs@1/themes/prism-tomorrow.min.css,npm/prismjs@1/plugins/inline-color/prism-inline-color.min.css,npm/prismjs@1/plugins/match-braces/prism-match-braces.min.css"
        />
      </Head>
      <Eruda />

      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  )
}
export default MyApp
