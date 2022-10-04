import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC } from 'react'
import styled from 'styled-components'
import { Filter } from '../components/Filter'
import { LineChart } from '../components/Line'
import { makeTitleTag } from '../lib/utils'

const DataPage: FC = () => {
  return (
    <Page>
      <Head>
        <title>{makeTitleTag`trends`}</title>
      </Head>

      <Filter />
      <LineChart />
    </Page>
  )
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`
export default dynamic(() => Promise.resolve(DataPage), {
  ssr: false,
})
