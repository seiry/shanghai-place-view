import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  CubeTransparentIcon,
  GlobeIcon,
} from '@heroicons/react/outline'

const _navs = [
  { name: '首页', path: '/', icon: HomeIcon },
  { name: 'Links', path: '/links', icon: GlobeIcon },
  { name: '关于我', path: '/aboutme', icon: CubeTransparentIcon },
]

export const Aside: FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter()
  return (
    <aside className="flex flex-col justify-start text-base-content w-full bg-secondary transition will-change-transform">
      {/* avatar */}
      <div className="pt-10 sticky top-0 ">
        <Link href="/">
          <a className="w-full">
            <div className="avatar w-full ">
              <div className=" rounded-full w-20 h-20 animate-bounce m-auto hover:shadow-2xl transition relative">
                <Image src="/images/profile.jpg" alt={'12'} layout="fill" />
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div>
        <nav className="py-4 ">
          {/* <ul className="flex flex-col pt-2 compact menu p-4 shadow-lg bg-base-100 rounded-box"> */}
          <ul className="menu py-3 w-full">
            {_navs.map((e, i) => {
              const Icon = e.icon
              return (
                <li key={i} className="text-secondary-content">
                  <Link href={e.path}>
                    <a
                      className={clsx({
                        active: router.pathname === e.path,
                      })}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {e.name}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
