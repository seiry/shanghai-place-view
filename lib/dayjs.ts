import dayjs from 'dayjs'

import { TimeNoHan } from './CONSTS'

export const formatTime = (
  timestamp: number = 0,
  format: string = 'D, M, YYYY'
): string => {
  // TODO:语义化时间 using hook
  // next demo里
  if (!timestamp) {
    return TimeNoHan
  }
  return normalizeDayjs(timestamp).format(format)
}

export const normalizeDayjs = (timestamp: number = 0) => {
  if (timestamp < 1000000000000) {
    timestamp *= 1e3
  }
  return dayjs(timestamp)
}
