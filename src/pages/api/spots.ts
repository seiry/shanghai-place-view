import { spot } from '@/db/schema'
import { db } from '@/db/turso'

export const config = {
  runtime: 'edge',
}
export const preferredRegion = ['sin1', 'sfo1', 'hnd1']

const handler = async () => {
  const data = await db.select().from(spot).run()
  return new Response(JSON.stringify(data.rows))
}

export default handler
