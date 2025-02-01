import { insertLogSchema, insertSpotSchema, log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import dayjs from 'dayjs'
import fetch from 'node-fetch'

export async function mainJob() {
  const data = await fetchData()
  console.log('data', data)
  await syncSpot(data)
  const time = dayjs().unix()
  const sqlDataArr = data.map((rawData) =>
    insertLogSchema.parse({
      spotId: +rawData.id,
      num: +rawData.num,
      dayNum: +rawData.day_num,
      time,
    }),
  )
  return db.insert(log).values(sqlDataArr).run()
}

// https://travel.whlyj.sh.gov.cn/scenicArea.html
const dataUrl =
  'https://travel.whlyj.sh.gov.cn/api/wx/app/sceneries-new?lng=121.47&lat=31.23&grade=0&sort=0&distance=0&keyword='

// 'https://lysh.smgtech.net/api/wx/app/sceneries-new?lng=121.47&lat=31.23&grade=0&sort=0&distance=0&keyword='
//  `https://lysh.eastday.com/lyj/WebApiService/api/GetSpots?t=${dayjs().valueOf()}`
// https://lysh.smgtech.net/scenicArea.html
//
interface LocationInfo {
  id: number
  code: string
  name: string
  time: string
  num: string
  ssd: string
  start_time: string
  end_time: string
  max_num: string
  type: string
  grade: string
  district_name: string
  info: string
  image: string[]
  des: string
  day_num: string
  day_maxnum: string
  updated_at: string
  distance: number
  opentime: string
  district_code: string
}

interface ReData {
  [key: string]: [LocationInfo]
}
interface Result {
  result: {
    data: LocationInfo[]
    top: {
      children: {
        [key: string]: LocationInfo
      }
      code: string
      max_num: number
      name: string
      num: number
      ssd: string
      time: string
      type: string
    }
  }
}

const fetchData = async () => {
  const json = (await fetch(dataUrl).then((re) => re.json())) as Result
  // https://github.com/node-fetch/node-fetch/issues/541
  const top: LocationInfo = {
    id: +json.result.top.code,
    code: json.result.top.code,
    name: json.result.top.name,
    time: json.result.top.time,
    ssd: json.result.top.ssd,
    start_time: '',
    end_time: '',
    num: `${json.result.top.num}`,
    day_num: `${json.result.top.num}`,
    max_num: `${json.result.top.max_num}`,
    type: '',
    grade: '',
    district_name: '',
    info: '',
    image: [],
    des: '',
    day_maxnum: `${json.result.top.max_num}`,
    updated_at: '',
    distance: 0,
    opentime: '',
    district_code: '',
  }
  const tops = Object.values(json.result.top.children)?.map((e) => ({
    ...e,
    id: +e.code,
    num: top.num,
    day_num: e.day_num ?? '',
  }))
  const values = [...json.result.data, top, ...tops]
  return values
}

const syncSpot = async (data: LocationInfo[]) => {
  const sqlDataArr = data.map((rawData) =>
    insertSpotSchema.parse({
      spotId: +rawData.id,
      name: rawData.name,
    }),
  )
  db.insert(spot).values(sqlDataArr).onConflictDoNothing().run()
}

// main()
