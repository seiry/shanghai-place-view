import { mainJob } from '@/lib/job'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest) => {
  const url = req.url
  const query = new URL(url).searchParams
  if (query.get('key') !== '19890604') {
    return new Response('', {
      status: 404,
    })
  }
  const re = await mainJob()

  return new Response(JSON.stringify(re.rowsAffected))
}

export default handler
