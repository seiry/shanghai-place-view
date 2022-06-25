import axios from 'axios'

export interface Params {
  name: string
}

export interface TrendResp {
  spotName: string
  spotId: number
  time: string
  num: number
}

export const fetcher = async (params: Params) => {
  const res = await axios.post('/api/data', {
    name: params.name,
  })
  return res.data
}
