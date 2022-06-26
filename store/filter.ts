import dayjs from 'dayjs'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TimeParams } from '../lib/fetch'
import { SpotItem } from '../lib/list'

export interface TimeFrame {
  name: string
  value: TimeParams
}

export enum TimeFrameName {
  'last 24 hours' = 'last 24 hours',
  'last 48 hours' = 'last 48 hours',
  'last 72 hours' = 'last 72 hours',
  'custom' = 'custom',
}

export const timeFrames: TimeFrame[] = [
  {
    name: TimeFrameName['last 24 hours'],
    value: {
      from: dayjs().subtract(1, 'day').toDate(),
      before: dayjs().toDate(),
    },
  },

  {
    name: TimeFrameName['last 48 hours'],
    value: {
      from: dayjs().subtract(2, 'day').toDate(),
      before: dayjs().toDate(),
    },
  },
  {
    name: TimeFrameName['last 72 hours'],
    value: {
      from: dayjs().subtract(3, 'day').toDate(),
      before: dayjs().toDate(),
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
  selected: SpotItem[]
  addSeleted: (item: SpotItem) => void
  rmSeleted: (item: SpotItem) => void
  timeRangePickerValue: [Date, Date]
  setTimeRage: (value: [Date, Date]) => void
}

export const useSelectedIds = (): number[] => {
  const { selected } = useFilterStore()
  return selected.map((item) => item.id)
}
export const useTimeFrame = (): TimeFrame => {
  const { timeFrame, timeRangePickerValue } = useFilterStore()

  if (timeFrame.name !== TimeFrameName.custom) {
    return timeFrame
  } else {
    return {
      ...timeFrame,
      value: {
        from: timeRangePickerValue[0],
        before: timeRangePickerValue[1],
      },
    }
  }
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
            selected: state.selected.filter((item) => item.id !== rm.id),
          })),
        addSeleted: (add) =>
          set((state) => {
            if (state.selected.find((item) => item.id === add.id)) {
              return state
            }
            return {
              selected: [...state.selected, add],
            }
          }),
      }),
      {
        name: 'filter',
      }
    )
  )
)
