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
import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { makeTitleTag } from '../../lib/utils'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { Filter } from '../../components/Filter'
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
  },
}

const DataPage: FC = () => {
  const lineData = useLineData()

  return (
    <>
      <Head>
        <title>{makeTitleTag`trends`}</title>
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
