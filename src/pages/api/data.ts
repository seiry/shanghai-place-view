import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import { Params } from '@/lib/fetch'
import dayjs from 'dayjs'
import { and, eq, gte, inArray, lte } from 'drizzle-orm'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorMsg } from '../../lib/error'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end()
  }

  const params: Params = req.body

  if (!params?.spotId) {
    return res.status(500).json(errorMsg('wrong input'))
  }

  if (Array.isArray(params.spotId)) {
    if (params.spotId.length === 0) {
      return res.status(200).json([])
    }

    try {
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

      return res.status(200).json(data.rows)
    } catch (error) {
      console.error(error)
      return res.status(500).json(errorMsg('Internal Server Error'))
    }
  } else {
    return res.status(500).json(errorMsg('wrong input'))
  }
}

export default handler
