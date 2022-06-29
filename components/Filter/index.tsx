import clsx from 'clsx'
import dayjs from 'dayjs'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/confetti.css'
import Pinyin from 'pinyin-engine'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { spotFetcher, SpotResp } from '../../lib/fetch'
import {
  TimeFrameName,
  timeFrames,
  useFilterStore,
  useTimeFrame,
} from '../../store/filter'

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  .btn-group {
  }
`
export const Filter: FC = () => {
  const {
    setTimeFrame,
    addSeleted,
    selected,
    rmSeleted,
    timeRangePickerValue,
    setTimeRage,
  } = useFilterStore()
  const timeFrame = useTimeFrame()

  const { data: spots } = useSWR<SpotResp[]>({}, spotFetcher)

  const pinyinList = useMemo(() => new Pinyin(spots ?? [], ['name']), [spots])

  const [searchText, setSearchText] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredSpotList = useMemo(() => {
    if (searchText) {
      return pinyinList.query(searchText) as unknown as SpotResp[]
    } else {
      return spots
    }
  }, [pinyinList, searchText, spots])

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
    <ToolBar>
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
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[400px] overflow-y-auto"
        >
          {filteredSpotList?.map((spot) => (
            <li key={spot.spotid} onClick={() => addSeleted(spot)}>
              <a>{spot.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 max-h-[150px] overflow-y-auto">
        {selected.map((spot) => (
          <li key={spot.spotid} onClick={() => rmSeleted(spot)}>
            <a>{spot.name}</a>
          </li>
        ))}
      </ul>

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
              isPicking ? timeRangePickerValue?.[0] : timeFrame.value.from
            ).format(pickFormat)}
          </span>
        )}
        <span>-</span>
        {timeRangePickerValue?.[1] && (
          <span>
            {' '}
            {dayjs(
              isPicking ? timeRangePickerValue?.[1] : timeFrame.value.before
            ).format(pickFormat)}
          </span>
        )}
      </DateTime>
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
