import { mainJob } from '@/lib/job'
import { NextApiRequest, NextApiResponse } from 'next'

export const preferredRegion = ['sin1', 'sfo1', 'hnd1']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.key !== '19890604') {
    return res.status(404).send('')
  }

  try {
    const re = await mainJob()
    return res.status(200).json(re.rowsAffected)
  } catch (error) {
    // 处理错误情况
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
