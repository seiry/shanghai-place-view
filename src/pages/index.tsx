import { Filter } from '@/components/Filter'
import { LineChart } from '@/components/Line'
import { Loading } from '@/components/Loading'
import { makeTitleTag } from '@/lib/utils'
import { ErrorBoundary } from '@sentry/nextjs'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC, Suspense } from 'react'
import { twc } from 'react-twc'

const DataPage: FC = () => {
  return (
    <Page>
      <Head>
        <title>{makeTitleTag`trends`}</title>
      </Head>

      <Filter />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <LineChart />
        </Suspense>
      </ErrorBoundary>
    </Page>
  )
}

const Page = twc.div`h-full flex flex-col gap-4 p-4`
export default dynamic(() => Promise.resolve(DataPage), {
  ssr: false,
})
// export default DataPage
