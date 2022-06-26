import dayjs from 'dayjs'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TimeParams } from '../lib/fetch'

export interface TimeFrame {
  name: string
  value: TimeParams
}
export const timeFrames: TimeFrame[] = [
  {
    name: 'last 24 hours',
    value: {
      from: dayjs().subtract(1, 'day').toDate(),
      before: dayjs().toDate(),
    },
  },
  // {
  //   name: 'yesterday',
  //   value: {
  //     // TODO:精准的昨天？
  //     from: dayjs().subtract(1, 'day').toDate(),
  //     before: dayjs().subtract(2, 'day').toDate(),
  //   },
  // },
  {
    name: 'last 48 hours',
    value: {
      from: dayjs().subtract(2, 'day').toDate(),
      before: dayjs().toDate(),
    },
  },
  {
    name: 'last 72 hours',
    value: {
      from: dayjs().subtract(3, 'day').toDate(),
      before: dayjs().toDate(),
    },
  },
]

interface FilterState {
  timeFrame: TimeFrame
  setTimeFrame: (to: TimeFrame) => void
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        timeFrame: timeFrames[0],
        setTimeFrame: (to) => set((state) => ({ timeFrame: to })),
      }),
      {
        name: 'filter',
      }
    )
  )
)
