import { useInterval, useTimeout } from 'beautiful-react-hooks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher, Params, TrendResp } from '../../lib/fetch'
import { makeTitleTag } from '../../lib/utils'

// export interface Params {
//   name: string
//   spotId: number
// }

const DataPage: FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter()
  const { query } = router
  // const name: Params['name'] = query.name?.[0] ?? query.name ?? ''
  // const spotId = query.spotId ?? ''
  const { data } = useSWR<TrendResp, any, Params>(
    {
      name: '上海欢乐谷',
    },
    fetcher
  )
  return (
    <>
      <Head>
        <title>{makeTitleTag`好东西`}</title>
      </Head>
      <span>广阔无垠的大草原上，奔跑着一只大板板</span>
      <span>{JSON.stringify(data)}</span>
      <br />
    </>
  )
}

// install (please make sure versions match peerDependencies)
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)

export default DataPage
