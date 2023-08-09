import { PrismaClient, Prisma } from '@prisma/client'
import fetch from 'node-fetch'
import dayjs from 'dayjs'
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

prisma.$on('query', async (e) => {
  // console.log(`${e.query}`)
})

export async function main() {
  const data = await fetchData()
  await syncSpot(data)
  const time = dayjs().toDate()
  const sqlDataArr: Prisma.logCreateManyInput[] = data.map((rawData) => ({
    spotid: +rawData.id,
    num: +rawData.num,
    daynum: +rawData.day_num,
    time,
  }))
  await prisma.log.createMany({
    data: sqlDataArr,
  })
}

const dataUrl =
  'https://lysh.smgtech.net/api/wx/app/sceneries-new?lng=121.47&lat=31.23&grade=0&sort=0&distance=0&keyword='
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
  const json: Result = await fetch(dataUrl).then((re) => re.json())
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
  const sqlDataArr: Prisma.spotCreateInput[] = data.map((rawData) => ({
    spotid: +rawData.id,
    name: rawData.name,
  }))
  await prisma.spot.createMany({
    data: sqlDataArr,
    skipDuplicates: true,
  })
}
export const run = () => {
  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
run()
