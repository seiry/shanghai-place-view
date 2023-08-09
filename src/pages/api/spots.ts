import { spot } from '@/db/schema'
import { db } from '@/db/turso'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const data = db.select().from(spot)

  res.status(200).json(data)
  return
}

export default handler
