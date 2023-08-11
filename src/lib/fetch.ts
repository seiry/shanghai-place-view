import { selectLogSchema, selectSpotSchema } from '@/db/schema'
import axios from 'axios'
import { TypeOf } from 'zod'

export type Params = IdParams & TimeParams

export interface IdParams {
  spotId: number[]
}
export interface TimeParams {
  from?: Date
  before?: Date
}
// export interface TrendResp {
//   time: string
//   num: number
//   spot: {
//     spotid: number
//     name: string
//   }
// }
export type TrendResp = TypeOf<typeof selectLogSchema>

export const dataFetcher = async (params: Params): Promise<TrendResp[][]> => {
  const res = await axios.post<TrendResp[]>('/api/data', {
    spotId: params.spotId,
    from: params.from,
    before: params.before,
  })
  const result: TrendResp[][] = []
  for (const id of params.spotId) {
    const data = res.data.filter((d) => d.spotId === id)
    result.push(data)
  }
  return result
}

export type SpotResp = TypeOf<typeof selectSpotSchema>

export const getFetcher = async <T>(path: string): Promise<T> => {
  const res = await axios.get<T>(`/api/${path}`)

  return res.data
}
