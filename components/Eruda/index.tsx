import { FC } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/dist/client/router'

declare global {
  interface Window {
    eruda: any
  }
}
export const Eruda: FC<React.PropsWithChildren<unknown>> = () => {
  const router = useRouter()
  if (!router.query.debug) {
    // window.console = {}
    return null
  }
  return (
    <>
      <Script
        src="https://fastly.jsdelivr.net/npm/eruda"
        strategy="lazyOnload"
        onLoad={(_) => {
          window.eruda.init()
        }}
      />
    </>
  )
}
