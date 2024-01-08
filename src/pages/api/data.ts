import { log, spot } from '@/db/schema'
import { db } from '@/db/turso'
import { Params } from '@/lib/fetch'
import dayjs from 'dayjs'
import { and, eq, gte, inArray, lte } from 'drizzle-orm'
import { NextRequest } from 'next/server'
import { errorMsg } from '../../lib/error'

const handler = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response(null, { status: 404 })
  }
  const params = (await req.json()) as Params

  // const params: Params = req.body.json()
  if (!params?.spotId) {
    return new Response(JSON.stringify(errorMsg('wrong input')), {
      status: 500,
    })
  }

  if (params.spotId instanceof Array) {
    if (params.spotId.length === 0) {
      return new Response(JSON.stringify([]))
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
    return new Response(JSON.stringify(data.rows))
  } else {
    return new Response(JSON.stringify(errorMsg('wrong input')), {
      status: 500,
    })
  }
}

export default handler
