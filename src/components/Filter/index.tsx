import clsx from 'clsx'
import dayjs from 'dayjs'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/confetti.css'
import Pinyin from 'pinyin-engine'
import { FC, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { getFetcher, SpotResp, TrendResp } from '../../lib/fetch'
import {
  TimeFrameName,
  timeFrames,
  useFilterStore,
  useTimeFrame,
} from '../../store/filter'
import { selectLogSchema, selectSpotSchema } from '@/db/schema'
import { TypeOf, z } from 'zod'
import { Loading } from '../Loading'

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 10;
  width: 100%;
  .btn-group {
  }
`
const useSpot = () => {
  const { data: spotsData } = useSWR('spots', getFetcher<SpotResp[]>, {
    suspense: true,
  })
  const spots = useMemo(
    () => spotsData?.map((e) => selectSpotSchema.parse(e)) ?? [],
    [spotsData],
  )
  return spots
}

const useMaxList = () => {
  const { data: maxList } = useSWR('max', getFetcher<TrendResp[]>, {
    suspense: true,
  })
  return maxList
}

const SpotFilter: FC = () => {
  const { addSeleted } = useFilterStore()
  const spots = useSpot()

  const pinyinList = useMemo(
    () => new Pinyin(spots ?? [], ['name', 'id']),
    [spots],
  )

  const [searchText, setSearchText] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredSpotList = useMemo(() => {
    if (searchText) {
      return pinyinList.query(searchText) as unknown as SpotResp[]
    } else {
      return spots
    }
  }, [pinyinList, searchText, spots])

  return (
    <div className={clsx('dropdown', { 'dropdown-open': showDropdown })}>
      <label>
        <div className="form-control m-1" tabIndex={0}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={() => setShowDropdown(false)}
              onFocus={() => setShowDropdown(true)}
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[400px] overflow-y-auto flex-nowrap"
      >
        {filteredSpotList?.map((spot) => (
          <li key={spot.spotId} onClick={() => addSeleted(spot)}>
            <a>{spot.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Selected: FC = () => {
  const { selected, rmSeleted } = useFilterStore()

  return (
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 max-h-[150px] overflow-y-auto flex-nowrap">
      {selected?.map((spot) => (
        <li key={spot.spotId} onClick={() => rmSeleted(spot)}>
          <a>{spot.name}</a>
        </li>
      ))}
    </ul>
  )
}
const MaxList: FC = () => {
  const maxList = useMaxList()

  const { addSeleted } = useFilterStore()
  return (
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 max-h-[150px] overflow-y-auto flex-nowrap">
      {/* <li className="self-center">max list</li> */}
      {maxList?.map((spot) => (
        <li
          key={spot.spotId}
          className="py-0"
          onClick={() => addSeleted({ spotId: spot.spotId, name: spot.name })}
        >
          <a className="py-0">
            {spot.name} {spot.num}
          </a>
        </li>
      ))}
    </ul>
  )
}

const DateList: FC = () => {
  const { setTimeFrame } = useFilterStore()
  const timeFrame = useTimeFrame()

  return (
    <div className="btn-group btn-group-vertical">
      {timeFrames.map((time) => (
        <button
          className={clsx('btn btn-sm', {
            'btn-active': timeFrame.name === time.name,
          })}
          key={time.name}
          onClick={() => setTimeFrame(time)}
        >
          {time.name}
        </button>
      ))}
    </div>
  )
}

const CustomDate: FC = () => {
  const { timeRangePickerValue, setTimeRage } = useFilterStore()
  const timeFrame = useTimeFrame()

  const dateTimeRef = useRef(null)

  useEffect(() => {
    if (!dateTimeRef.current) {
      return
    }
    flatpickr(dateTimeRef.current, {
      enableTime: true,
      mode: 'range',
      onClose: (selectedDates) => {
        setTimeRage(selectedDates as [Date, Date])
      },
      clickOpens: timeFrame.name === TimeFrameName.custom,
    })

    return () => {}
  }, [setTimeRage, timeFrame.name])

  const isPicking = timeFrame.name === TimeFrameName.custom

  return (
    <DateTime
      ref={dateTimeRef}
      className={clsx('text-base transition-colors', {
        'text-primary': isPicking,
        'text-gray-300 !cursor-not-allowed': !isPicking,
      })}
    >
      {timeRangePickerValue?.[0] && (
        <span>
          {dayjs(
            isPicking ? timeRangePickerValue?.[0] : timeFrame.value.from,
          ).format(pickFormat)}
        </span>
      )}
      <span>-</span>
      {timeRangePickerValue?.[1] && (
        <span>
          {' '}
          {dayjs(
            isPicking ? timeRangePickerValue?.[1] : timeFrame.value.before,
          ).format(pickFormat)}
        </span>
      )}
    </DateTime>
  )
}

export const Filter: FC = () => {
  return (
    <ToolBar>
      <Suspense fallback={<Loading />}>
        <SpotFilter />
      </Suspense>

      <Selected />
      <Suspense fallback={<Loading />}>
        <MaxList />
      </Suspense>
      <DateList />

      <CustomDate />
    </ToolBar>
  )
}

const pickFormat = 'YYYY-MM-DD HH:mm:ss'
const DateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
