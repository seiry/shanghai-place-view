import { spot } from '@/db/schema'
import { db } from '@/db/turso'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const data = await db.select().from(spot).run()

  res.status(200).json(data.rows)
}

export default handler
