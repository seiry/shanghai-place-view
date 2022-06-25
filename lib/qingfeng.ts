import dayjs from 'dayjs'
import { TimeNoHan } from './CONSTS'
// @ts-ignore
import nzhcn from 'nzh/cn'
interface QingfengTime {
  text: string
  name: string
  period: string | number
  cnPeriod: string
}
const defaultQingfeng: QingfengTime = {
  text: TimeNoHan,
  name: '史前庆丰',
  period: 0,
  cnPeriod: '零',
}
export const qingfeng = (timestamp: number = 0): QingfengTime => {
  if (!timestamp) {
    return defaultQingfeng
  }
  if (timestamp < 1000000000000) {
    timestamp *= 1e3
  }
  // timestamp = dayjs('2013-03-14').valueOf()
  const to = timestamp
  const from = dayjs('2013-03-14').valueOf()
  const deltaMs = to - from
  const year = deltaMs / 1e3 / 60 / 60 / 24 / 365
  let period: number
  let cnPeriod: string
  if (year > 0) {
    period = Math.ceil(year)
  } else if (year === 0) {
    period = 1
  } else {
    period = Math.floor(year)
  }

  cnPeriod = nzhcn.encodeS(period)

  if (period === 1) {
    cnPeriod = '元'
  }
  return {
    text: `庆丰${cnPeriod}年`,
    name: '庆丰',
    period,
    cnPeriod,
  }
}
