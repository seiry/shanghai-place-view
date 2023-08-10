import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import dayjs from 'dayjs'
import { and, eq, gte, inArray, lte } from 'drizzle-orm'
import { NextApiHandler } from 'next'
import { errorMsg } from '../../lib/error'
import { Params } from '../../lib/fetch'

const handler: NextApiHandler = async (req, res) => {
  const params: Params = req.body
  if (!params.spotId) {
    res.status(500).json(errorMsg('wrong input'))
  }
  if (params.spotId instanceof Array) {
    if (params.spotId.length === 0) {
      res.status(200).json([])
      return
    }
    const data = await db
      .select()
      .from(log)
      .innerJoin(spot, eq(log.spotId, spot.spotId))
      .where(
        and(
          inArray(log.spotId, params.spotId),
          lte(log.time, dayjs(params.before).unix() ?? dayjs().unix()),
          gte(log.time, dayjs(params.from).unix() ?? 0),
        ),
      )
      .run()
    res.status(200).json(data.rows)
  }
}

export default handler
