import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  ChartTypeRegistry,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { makeTitleTag } from '../lib/utils'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { Filter } from '../components/Filter'
import { useLineData } from '../lib/data'
import dayjs from 'dayjs'

const LineWrap = styled.div`
  /* height: 300px; */
  flex: 1;
  position: relative;
  user-select: none;
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

export const options: ChartOptions<'line'> = {
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
    tooltip: {
      callbacks: {
        footer(tooltipItems) {
          const time = tooltipItems[0].label
          return dayjs(time).format('dddd')
          //TODO: maybe weather?
        },
      },
    },
  },
}

const DataPage: FC = () => {
  const lineData = useLineData()
  return (
    <Page>
      <Head>
        <title>{makeTitleTag`trends`}</title>
      </Head>

      <Filter />
      <LineWrap>
        <Line options={options} data={lineData} height="100%" />
      </LineWrap>
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
