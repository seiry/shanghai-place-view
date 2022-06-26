import dayjs from 'dayjs'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useFilterStore } from '../store/filter'
import { TrendResp, Params, fetcher } from './fetch'

export const useLineData = () => {
  const { timeFrame } = useFilterStore()
  const { data } = useSWR<TrendResp[][], any, Params>(
    {
      spotId: [66, 70],
      from: timeFrame.value.from,
      before: timeFrame.value.before,
    },
    fetcher
  )

  const lineData = useMemo(
    () => ({
      // TODO:special map label for across day
      labels: data?.[0]?.map((d) => dayjs(d.time).format('HH:mm')),
      datasets:
        data?.map((singleLine) => ({
          label: singleLine?.[0]?.spotName,
          data: singleLine?.map((d) => d.num),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // TODO: colors,
        })) ?? [],
    }),
    [data]
  )
  return lineData
}
