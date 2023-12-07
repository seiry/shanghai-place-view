import { spot } from '@/db/schema'
import { db } from '@/db/turso'
import { reigons } from '@/lib/CONSTS'

export const config = {
  runtime: 'edge',
}
export const preferredRegion = reigons

const handler = async () => {
  const data = await db.select().from(spot).run()
  return new Response(JSON.stringify(data.rows))
}

export default handler
