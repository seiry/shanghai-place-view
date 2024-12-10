import React, { memo } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

export const Header = memo(() => {
  return (
    <header
      className={clsx(' w-full  top-0 left-0 z-50 fixed transform-gpu ')}
      // inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b border-base-200 bg-base-100 text-base-content sticky
    >
      <div className="navbar shadow-md bg-primary">
        <div className="flex-none">
          <label
            htmlFor="siderBar"
            className="btn btn-square btn-ghost drawer-button md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current text-primary-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
        <div className="flex items-center flex-none ">
          <Link
            href="/"
            aria-label="Homepage"
            className="px-2 flex-0 btn btn-ghost md:px-4 "
          >
            <div className="inline-block text-3xl font-title text-primary-content">
              <span className="">强哥勇敢飞，雷子永相随</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
})
