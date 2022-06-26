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
import useSWR from 'swr'
import { fetcher, Params, TrendResp } from '../../lib/fetch'
import { makeTitleTag } from '../../lib/utils'
// install (please make sure versions match peerDependencies)
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Wrap = styled.div`
  height: 100px;
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
  const router = useRouter()
  const { query } = router
  // const name: Params['name'] = query.name?.[0] ?? query.name ?? ''
  // const spotId = query.spotId ?? ''

  const { data } = useSWR<TrendResp[][], any, Params>(
    {
      spotId: [66, 70],
    },
    fetcher
  )

  const lineData = {
    labels: data?.[0]?.map((d) => dayjs(d.time).format('HH:mm')),
    datasets:
      data?.map((singleLine) => ({
        label: singleLine?.[0]?.spotName,
        data: singleLine?.map((d) => d.num),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // TODO: colors,
      })) ?? [],
  }
  return (
    <>
      <Head>
        <title>{makeTitleTag`好东西`}</title>
      </Head>
      <Wrap>
        <Line options={options} data={lineData} />;
      </Wrap>
    </>
  )
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default dynamic(() => Promise.resolve(DataPage), {
  ssr: false,
})
