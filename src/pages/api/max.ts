import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import { and, desc, eq, notInArray } from 'drizzle-orm'
import { errorMsg } from '../../lib/error'

export const config = {
  runtime: 'edge',
}

const handler = async () => {
  const time = await db
    .select()
    .from(log)
    .orderBy(desc(log.time))
    .limit(1)
    .run()
  const lastTime = time.rows?.[0]?.time

  console.log({ lastTime })
  if (!lastTime) {
    return new Response(JSON.stringify(errorMsg('no date')), {
      status: 500,
    })
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
  console.log({ maxList: maxList.rows })

  return new Response(JSON.stringify(maxList.rows))
}

export default handler
