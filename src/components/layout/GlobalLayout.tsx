import React, { FC } from 'react'
import { Header } from '../Header'

export const GlobalLayout: FC<React.PropsWithChildren<unknown>> = (props) => {
  return (
    <>
      <Header />

      <main className="h-[calc(100vh-64px-130px)] pt-5 relative">
        {props.children}
      </main>
    </>
  )
}
