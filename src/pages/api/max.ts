import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import { and, desc, eq, notInArray } from 'drizzle-orm'
import { NextApiHandler } from 'next'
import { errorMsg } from '../../lib/error'
const handler: NextApiHandler = async (req, res) => {
  const time = await db
    .select()
    .from(log)
    .orderBy(desc(log.time))
    .limit(1)
    .run()
  const lastTime = time.rows?.[0]?.time

  if (!lastTime) {
    res.status(500).json(errorMsg('no date'))
    return
  }

  const maxList = await db
    .select()
    .from(log)
    .innerJoin(spot, eq(log.spotId, spot.spotId))
    .where(
      and(
        eq(log.time, lastTime as number),
        notInArray(log.spotId, [102, 107, 104, 106]),
      ),
    )
    .orderBy(desc(log.num))
    .limit(5)
    .run()

  res.status(200).json(maxList.rows)
}

export default handler
