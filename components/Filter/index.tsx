import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC } from 'react'
import styled from 'styled-components'
import { timeFrames, useFilterStore } from '../../store/filter'

const ToolBar = styled.div`
  display: flex;
  .btn-group {
    width: 14rem;
  }
`
export const Filter: FC = () => {
  const { timeFrame, setTimeFrame } = useFilterStore()

  return (
    <ToolBar>
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
