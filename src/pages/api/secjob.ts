import { mainJob } from '@/lib/job'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.query.key !== '19890604') {
    res.status(404).end()
    return
  }
  const re = await mainJob()

  res.status(200).end(re.rowsAffected.toString())
}

export default handler
