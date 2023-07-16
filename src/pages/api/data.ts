import dayjs from 'dayjs'
import { NextApiHandler } from 'next'
import { errorMsg } from '../../lib/error'
import { Params } from '../../lib/fetch'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const params: Params = req.body
  if (!params.spotId) {
    res.status(500).json(errorMsg('wrong input'))
  }
  if (params.spotId instanceof Array) {
    const data = await prisma.log.findMany({
      select: {
        time: true,
        num: true,
        spot: true,
      },
      where: {
        AND: [
          {
            spotid: {
              in: params.spotId,
            },
          },
          {
            time: {
              lte: params.before ?? dayjs().toDate(),
              gte: params.from ?? undefined,
            },
          },
        ],
      },
    })

    res.status(200).json(data)
    return
  }
}

export default handler
