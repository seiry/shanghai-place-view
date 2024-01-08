import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import { and, desc, eq, notInArray } from 'drizzle-orm'
import { errorMsg } from '../../lib/error'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const timeResult = await db
      .select()
      .from(log)
      .orderBy(desc(log.time))
      .limit(1)
      .run()
    const lastTime = timeResult.rows?.[0]?.time as number | undefined

    if (!lastTime) {
      return res.status(500).json(errorMsg('no date'))
    }

    const maxList = await db
      .select()
      .from(log)
      .innerJoin(spot, eq(log.spotId, spot.spotId))
      .where(
        and(
          eq(log.time, lastTime),
          notInArray(log.spotId, [102, 107, 104, 106]),
        ),
      )
      .orderBy(desc(log.num))
      .limit(5)
      .run()

    return res.status(200).json(maxList.rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json(errorMsg('Internal Server Error'))
  }
}

export default handler
