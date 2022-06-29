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

export const useLineData = () => {
  const timeFrame = useTimeFrame()
  const selectedIds = useSelectedIds()
  const { data } = useSWR<TrendResp[][], any, Params>(
    {
      spotId: selectedIds,
      from: timeFrame.value.from,
      before: timeFrame.value.before,
    },
    dataFetcher
  )
  const lineData = useMemo(
    () => ({
      // TODO:special map label for across day
      labels: data?.[0]?.map((d) => dayjs(d.time).format('HH:mm')),
      datasets:
        data?.map((singleLine, i) => ({
          label: singleLine?.[0]?.spotName,
          data: singleLine?.map((d) => d.num),
          borderColor: colors[i % colors.length],
          backgroundColor: colors[i % colors.length] + '7f', //50alpha
          // TODO: colors,
        })) ?? [],
    }),
    [data]
  )
  return lineData
}
