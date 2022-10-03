import { ChartData } from 'chart.js'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useFilterStore, useSelectedIds, useTimeFrame } from '../store/filter'
import { TrendResp, Params, dataFetcher } from './fetch'

const colors = [
  '#65c3c8',
  '#ef9fbc',
  '#eeaf3a',
  '#291334',
  '#4AA8C0',
  '#823290',
  '#EE8133',
]

export const useLineData = (): ChartData<'line', number[], string> => {
  const timeFrame = useTimeFrame()
  const selectedIds = useSelectedIds()
  // console.log(selectedIds)
  const { data } = useSWR<TrendResp[][], any, Params>(
    {
      spotId: selectedIds,
      from: timeFrame.value.from,
      before: timeFrame.value.before,
    },
    dataFetcher
  )
  const lineData = useMemo(() => {
    if (!data) {
      return {
        labels: [],
        datasets: [],
      }
    }
    const lengths = data.map((d) => d.length)
    const maxLength = Math.max(...lengths)
    const maxOne = data.find((d) => d.length === maxLength)!
    for (const e of data) {
      if (e.length < maxLength) {
        const length = maxLength - e.length
        const addPart = Array(length).fill({
          spot: { name: e[0].spot.name },
          num: 0,
        })
        e.unshift(...addPart)
      }
    }
    return {
      // TODO:special map label for across day
      labels: maxOne?.map((d) => dayjs(d.time).format('YYYY-MM-DD HH:mm')),
      datasets: data?.map((singleLine, i) => ({
        label: singleLine?.[0]?.spot.name,
        data: singleLine?.map((d) => d.num),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '7f', //50alpha
      })),
    }
  }, [data])
  return lineData
}
