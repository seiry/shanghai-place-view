import { ChartData } from 'chart.js'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useSelectedIds, useTimeFrame } from '../store/filter'
import { Params, TrendResp, dataFetcher } from './fetch'

const colors = [
  '#65c3c8',
  '#ef9fbc',
  '#eeaf3a',
  '#291334',
  '#4AA8C0',
  '#823290',
  '#EE8133',
]
const dataTimeFormat = 'YYYY-MM-DD HH:mm'
const _paddingNum = -19890604

const findOrMakeNode = (line: TrendResp[], time: string) => {
  return (
    line.find((i) => i.time === time) || {
      ...line[0],
      num: _paddingNum,
      time,
    }
  )
}

const removePaddingMock = (data: TrendResp[][]) => {
  return data.map((line) => {
    for (let i = 0; i < line.length; i++) {
      const element = line[i]
      if (element.num === _paddingNum) {
        element.num = line?.[i - 1]?.num ?? 0
      }
    }
    return line
  })
}

const fixData = (data: TrendResp[][]) => {
  // 如果是相互对比 效率太低 好像用set会更好
  // for (let i = 0; i < data.length; i++) {
  //   const thisData = data[i]
  //   for (let j = i + 1; j < data.length; j++) {
  //     const targetData = data[j]
  //   }
  // }

  const newData = data.map((item) => {
    item.forEach((i) => (i.time = dayjs(i.time).format(dataTimeFormat)))
    return item
  })

  const dates = newData
    .map((d) => d.map((i) => i.time))
    .flat()
    .sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())
  const datesSet = [...new Set(dates)]

  const paddedData: TrendResp[][] = []
  for (let i = 0; i < newData.length; i++) {
    const line = newData[i]
    const re: TrendResp[] = []
    for (let j = 0; j < datesSet.length; j++) {
      const time = datesSet[j]
      re.push(findOrMakeNode(line, time))
    }
    paddedData.push(re)
  }

  const finalData = removePaddingMock(paddedData)
  return finalData
}

export const useLineData = () => {
  const timeFrame = useTimeFrame()
  const selectedIds = useSelectedIds()
  // console.log(selectedIds)
  const { data: originData } = useSWR<TrendResp[][], any, Params>(
    {
      spotId: selectedIds,
      from: timeFrame.value.from,
      before: timeFrame.value.before,
    },
    dataFetcher,
    { suspense: true },
  )
  const lineData = useMemo<ChartData<'line'>>(() => {
    if (!originData) {
      return {
        labels: [],
        datasets: [],
      }
    }
    const data = fixData(originData)

    return {
      labels: data[0]?.map((d) => d.time),
      datasets: data?.map((singleLine, i) => ({
        label: singleLine?.[0]?.spot.name,
        data: singleLine?.map((d) => ({
          x: dayjs(d.time).valueOf(),
          y: d.num,
        })),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '7f', //50alpha
      })),
    }
  }, [originData])

  return lineData
}
