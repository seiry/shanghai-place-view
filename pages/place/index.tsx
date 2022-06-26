import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { fetcher, Params, TimeParams, TrendResp } from '../../lib/fetch'
import { makeTitleTag } from '../../lib/utils'
// install (please make sure versions match peerDependencies)
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { Filter } from '../../components/Filter'
import { useStore } from 'zustand'
import { useFilterStore } from '../../store/filter'
import { useLineData } from '../../lib/data'

const Wrap = styled.div`
  height: 300px;
  position: relative;
`

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options: ChartOptions = {
  responsive: true,
  // animation: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    // colorschemes: {
    //   scheme: 'brewer.Paired12'
    // }
  },
}

const DataPage: FC = () => {
  const router = useRouter()
  const { query } = router
  // const name: Params['name'] = query.name?.[0] ?? query.name ?? ''
  // const spotId = query.spotId ?? ''
  const lineData = useLineData()

  return (
    <>
      <Head>
        <title>{makeTitleTag`好东西`}</title>
      </Head>

      <Filter />
      <Wrap>
        <Line options={options} data={lineData} />
      </Wrap>
    </>
  )
}

export default dynamic(() => Promise.resolve(DataPage), {
  ssr: false,
})
