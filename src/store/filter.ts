import dayjs from 'dayjs'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { SpotResp, TimeParams } from '@/lib/fetch'
import { useEffect, useState } from 'react'

export interface TimeFrame {
  name: TimeFrameName
  value: TimeParams
}

export enum TimeFrameName {
  'last 24 hours' = 'last 24 hours',
  'last 48 hours' = 'last 48 hours',
  'last 72 hours' = 'last 72 hours',
  'Last 7 days' = 'Last 7 days',
  'custom' = 'custom',
}

const beforeNow = dayjs().add(30, 'minutes').toDate()
export const timeFrames: TimeFrame[] = [
  {
    name: TimeFrameName['last 24 hours'],
    value: {
      from: dayjs().subtract(1, 'day').toDate(),
      before: beforeNow,
    },
  },

  {
    name: TimeFrameName['last 48 hours'],
    value: {
      from: dayjs().subtract(2, 'day').toDate(),
      before: beforeNow,
    },
  },
  {
    name: TimeFrameName['last 72 hours'],
    value: {
      from: dayjs().subtract(3, 'day').toDate(),
      before: beforeNow,
    },
  },
  {
    name: TimeFrameName['Last 7 days'],
    value: {
      from: dayjs().subtract(7, 'day').toDate(),
      before: beforeNow,
    },
  },
  {
    name: TimeFrameName['custom'],
    value: {},
  },
]

interface FilterState {
  timeFrame: TimeFrame
  setTimeFrame: (to: TimeFrame) => void
  selected: SpotResp[]
  addSeleted: (item: SpotResp) => void
  rmSeleted: (item: SpotResp) => void
  timeRangePickerValue: [Date, Date]
  setTimeRage: (value: [Date, Date]) => void
}

export const useSelectedIds = (): number[] => {
  const { selected } = useFilterStore()
  return selected
    .map((item) => item.spotId)
    .filter((item) => item !== undefined)
}

export const useTimeFrame = (): TimeFrame => {
  const { timeFrame, timeRangePickerValue } = useFilterStore()

  const [t, setT] = useState(() => timeFrame)

  useEffect(() => {
    if (timeFrame.name !== TimeFrameName.custom) {
      setT(timeFrame)
    } else {
      setT({
        ...timeFrame,
        value: {
          from: timeRangePickerValue[0],
          before: timeRangePickerValue[1],
        },
      })
    }
  }, [timeFrame.name])

  return t
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set, get) => ({
        timeFrame: timeFrames[0],
        selected: [],
        timeRangePickerValue: [
          timeFrames[0].value.from!,
          timeFrames[0].value.before!,
        ],
        setTimeRage: (value: [Date, Date]) =>
          set((state) => ({
            timeRangePickerValue: value,
          })),
        setTimeFrame: (to) => set((state) => ({ timeFrame: to })),
        rmSeleted: (rm) =>
          set((state) => ({
            selected: state.selected.filter(
              (item) => item.spotId !== rm.spotId,
            ),
          })),
        addSeleted: (add) =>
          set((state) => {
            if (state.selected.find((item) => item.spotId === add.spotId)) {
              return state
            }
            return {
              selected: [...state.selected, add],
            }
          }),
      }),
      {
        name: 'filter',
      },
    ),
  ),
)
