import useInterval from 'beautiful-react-hooks/useInterval'
import useTimeout from 'beautiful-react-hooks/useTimeout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { makeTitle, makeTitleTag } from '../lib/utils'

const Page404: FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter()
  const [second, setSecond] = useState(5)

  useTimeout(() => {
    router.replace('/')
  }, 5e3)

  useInterval(() => {
    setSecond((e) => e - 1)
  }, 1e3)

  useEffect(() => {}, [router])

  return (
    <>
      <Head>
        <title>{makeTitleTag`啊啊啊啊找不到啊`}</title>
      </Head>
      <span>广阔无垠的大草原上，奔跑着一只大板板</span>
      <br />
      <span>{second}秒后转移到越共回国通道。。。</span>
    </>
  )
}

export default Page404
