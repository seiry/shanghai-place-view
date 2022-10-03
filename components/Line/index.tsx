import { ChartOptions } from 'chart.js'
import dayjs from 'dayjs'
import { FC, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { match } from 'ts-pattern'
import { useLineData } from '../../lib/data'
import { TimeFrameName, useTimeFrame } from '../../store/filter'

const LineWrap = styled.div`
  /* height: 300px; */
  flex: 1;
  position: relative;
  user-select: none;
`

const options: ChartOptions<'line'> = {
  responsive: true,
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
  },
  scales: {
    x: {
      ticks: {
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
    },
  },
}

export const LineChart: FC = () => {
  const lineData = useLineData()
  const { name: timeFrameName } = useTimeFrame()

  return (
    <LineWrap>
      <Line options={options} data={lineData} height="100%" />
    </LineWrap>
  )
}
