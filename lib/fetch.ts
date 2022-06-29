import axios from 'axios'
import { number } from 'ts-pattern/dist/patterns'

export type Params = IdParams & TimeParams

export interface IdParams {
  spotId: number[]
}
export interface TimeParams {
  from?: Date
  before?: Date
}
export interface TrendResp {
  spotName: string
  spotId: number
  time: string
  num: number
}

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

export interface SpotResp {
  spotid: number
  name: string
}

export const spotFetcher = async (params: Params): Promise<SpotResp[]> => {
  const res = await axios.post<SpotResp[]>('/api/spots')

  return res.data
}
