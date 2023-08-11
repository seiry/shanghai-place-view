import React, { FC } from 'react'
import { Header } from '../Header'

export const GlobalLayout: FC<React.PropsWithChildren<unknown>> = (props) => {
  return (
    <>
      <Header />

      <main className="h-full  relative pt-20">{props.children}</main>
    </>
  )
}
