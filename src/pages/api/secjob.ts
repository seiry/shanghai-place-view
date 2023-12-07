import { reigons } from '@/lib/CONSTS'
import { mainJob } from '@/lib/job'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}
export const preferredRegion = reigons

const handler = async (req: NextRequest) => {
  if (req.nextUrl.searchParams.get('key') !== '19890604') {
    return new Response('', {
      status: 404,
    })
  }
  const re = await mainJob()

  return new Response(JSON.stringify(re.rowsAffected))
}

export default handler
