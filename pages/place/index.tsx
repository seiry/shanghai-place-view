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

export default DataPage
