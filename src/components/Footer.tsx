import dayjs from 'dayjs'

export const Footer = () => {
  return (
    <footer className="mt-10 px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300 select-none">
      <div className="flex items-center relative">
        <span className="text-4xl relative zAnimationWrap hover:stopAnimation">
          🐷
          <div className="zAnimation absolute w-10 h-10 bottom-0 left-0">
            <span>z</span>
            <span>z</span>
            <span>z</span>
          </div>
        </span>
        <p>
          平哥和强哥的养猪场
          <br />
          1949 - {dayjs().format('YYYY')}
        </p>
      </div>
      {/* <div className="md:place-self-center md:justify-self-end" /> */}
    </footer>
  )
}
