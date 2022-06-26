import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import { SpotItem, spots } from '../../lib/list'
import { timeFrames, useFilterStore } from '../../store/filter'
import Pinyin from 'pinyin-engine'

const ToolBar = styled.div`
  display: flex;
  width: 100%;
  .btn-group {
    width: 14rem;
  }
`
const pinyinList = new Pinyin(spots, ['name'])
export const Filter: FC = () => {
  const { timeFrame, setTimeFrame, addSeleted, selected, rmSeleted } =
    useFilterStore()

  const [searchText, setSearchText] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredSpotList = useMemo(() => {
    if (searchText) {
      return pinyinList.query(searchText) as unknown as SpotItem[]
    } else {
      return spots
    }
  }, [searchText])

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
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[300px] overflow-y-auto"
        >
          {filteredSpotList.map((spot) => (
            <li key={spot.id} onClick={() => addSeleted(spot)}>
              <a>{spot.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[300px] overflow-y-auto">
        {selected.map((spot) => (
          <li key={spot.id} onClick={() => rmSeleted(spot)}>
            <a>{spot.name}</a>
          </li>
        ))}
      </ul>

      <div className="btn-group btn-group-vertical">
        {timeFrames.map((time) => (
          <button
            className={clsx('btn', {
              'btn-active': timeFrame.name === time.name,
            })}
            key={time.name}
            onClick={() => setTimeFrame(time)}
          >
            {time.name}
          </button>
        ))}
      </div>
    </ToolBar>
  )
}
