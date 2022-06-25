import { useInterval, useTimeout } from 'beautiful-react-hooks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { makeTitle, makeTitleTag } from '../lib/utils'

const Index: FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{makeTitleTag`好东西`}</title>
      </Head>
      <span>广阔无垠的大草原上，奔跑着一只大板板</span>
      <br />
    </>
  )
}

export default Index
