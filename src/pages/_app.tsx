import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../lib/dayjs.init'
import '@/styles/global.css'
import '@/styles/header.scss'
import { GlobalLayout } from '../components/layout/GlobalLayout'

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
      </Head>
      {/* <Eruda /> */}

      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  )
}
export default MyApp
