import clsx from 'clsx'
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { Header } from '../Header'

export const GlobalLayout: FC<React.PropsWithChildren<unknown>> = (props) => {
  return (
    <>
      <Header />

      <div className={clsx('w-full mx-auto min-h-full')}>
        <div className="flex ">
          <div
            className={clsx(
              'w-full flex-auto md:static md:max-h-full md:overflow-visible ',
            )}
          >
            <main className="h-[calc(100vh-64px-130px)] pt-5 relative">
              {props.children}
            </main>
          </div>

          {/* <main className="min-h-[calc(100vh-100px)]">{props.children}</main> */}
        </div>
      </div>
    </>
  )
}
