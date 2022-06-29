import { NextApiHandler } from 'next'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const data = await prisma.spot.findMany({
    select: {
      spotid: true,
      name: true,
    },
  })

  res.status(200).json(data)
  return
}

export default handler
