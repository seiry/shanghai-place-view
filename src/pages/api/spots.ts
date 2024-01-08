import { spot } from '@/db/schema'
import { db } from '@/db/turso'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await db.select().from(spot).run()
    return res.status(200).json(data.rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
