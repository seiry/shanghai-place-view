import { NextApiHandler } from 'next'
import { errorMsg } from '../../lib/error'
import { Params } from '../../lib/fetch'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const params: Params = req.body
  if (!params.name) {
    res.status(500).json(errorMsg('wrong input'))
  }
  const data = await prisma.log.findMany({
    select: {
      spotName: true,
      spotId: true,
      time: true,
      num: true,
    },
    where: {
      spotName: params.name,
    },
  })

  res.status(200).json(data)
}

export default handler
