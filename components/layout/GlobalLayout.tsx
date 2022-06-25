import clsx from 'clsx'
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Aside } from '../Aside'
import { Header } from '../Header'
import { Footer } from '../Footer'

/**
 * close sider bar
 */
export const closeSideBarWhenCould = () => {
  const ele = document.querySelector<HTMLInputElement>('#siderBar')
  if (ele?.checked) {
    ele.click()
  }
}

export const GlobalLayout: FC<React.PropsWithChildren<unknown>> = (props) => {
  const [checked, setChecked] = useState(false)
  const onCheckedChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // debugger
      setChecked(event.target.checked)
    },
    []
  )

  useEffect(() => {
    // console.log({ checked })
  }, [checked])

  return (
    <>
      <Header />

      <div className={clsx('w-full mx-auto min-h-full')}>
        <input
          id="siderBar"
          type="checkbox"
          className="drawer-toggle"
          // className="fixed top-5 left-10 z-50"
          onChange={onCheckedChange}
        />
        <div className="flex ">
          {/* <div
            id="sideBar"
            className={clsx(
              'bg-secondary fixed flex-none z-40 inset-0 h-full pt-16 md:static md:h-auto md:overflow-y-visible md:pt-0 lg:block  w-80 md:w-80 md:shadow-none transition-all md:translate-x-0',
              { ' -translate-x-full': !checked },
              { 'shadow-2xl translate-x-0': checked }
            )}
          >
            <div className="h-full overflow-y-auto md:h-auto md:block relative md:sticky md:bg-transparent overflow-hidden md:top-14">
              <Aside />
            </div>
          </div> */}

          <div
            className={clsx(
              'w-full flex-auto md:static md:max-h-full md:overflow-visible '
            )}
          >
            <main
              className="min-h-[calc(100vh-64px-130px)] pt-5"
              onClick={(event) => {
                closeSideBarWhenCould()
              }}
            >
              {props.children}
            </main>
            <Footer />
          </div>

          {/* <main className="min-h-[calc(100vh-100px)]">{props.children}</main> */}
        </div>
      </div>
    </>
  )
}
