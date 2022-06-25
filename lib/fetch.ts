import axios from 'axios'

export interface Params {
  name: string
}

export interface TrendResp {
  [name: string]: any
}

export const fetcher = async (params: Params) => {
  const res = await axios.post('/api/data', {
    name: params.name,
  })
  return res.data
}
