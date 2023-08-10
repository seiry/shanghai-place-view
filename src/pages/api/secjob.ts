import { mainJob } from '@/lib/job'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const re = await mainJob()

  res.status(200).end(re)
}

export default handler
