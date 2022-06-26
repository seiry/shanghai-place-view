import dayjs from 'dayjs'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TimeParams } from '../lib/fetch'
import { SpotItem } from '../lib/list'

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
