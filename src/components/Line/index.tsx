'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Decimation,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js'

import dayjs from 'dayjs'
import { FC, Suspense } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useLineData } from '../../lib/data'

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
  // Title,
  Tooltip,
  Legend,
  Decimation,
  TimeScale,
)

const options: ChartOptions<'line'> = {
  responsive: true,
  // parsing: false,

  // animation: false,
  plugins: {
    legend: {
      position: 'top' as const,
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
    decimation: {
      // enabled: true,
      algorithm: 'lttb',
      samples: 300,
    },
  },
  scales: {
    x: {
      ticks: {
        // source: 'auto',
        callback: function (val, index, ticks) {
          const date = dayjs(this.getLabelForValue(index))
          /*
            会导致canvas refresh
            * 
            const format = match(timeFrameName)
            .with(TimeFrameName['Last 7 days'], () => 'MM-DD ha')
            .otherwise(() => 'MMM D日 HH:mm')
            */
          let format = 'MM-DD ha'
          if (ticks.length < 300) {
            format = 'MM-DD HH:mm'
          }
          return date.format(format)
        },
        maxRotation: 45,
        autoSkipPadding: 14,
      },
      // type: 'linear',
    },
  },
}

export const LineChart: FC = () => {
  const lineData = useLineData()
  return (
    <Suspense fallback={<>loading</>}>
      <LineWrap>
        <Line options={options} data={lineData} height="100%" />
      </LineWrap>
    </Suspense>
  )
}