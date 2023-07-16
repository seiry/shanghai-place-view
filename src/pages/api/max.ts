import dayjs from 'dayjs'
import { NextApiHandler } from 'next'
import { errorMsg } from '../../lib/error'
import { Params } from '../../lib/fetch'
import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'
const handler: NextApiHandler = async (req, res) => {
  const where: Prisma.logFindManyArgs['where'] = {
    AND: [{}],
  }
  const time = await prisma.log.findFirst({
    select: {
      time: true,
    },
    where,
    orderBy: {
      time: 'desc',
    },
  })
  if (!time) {
    res.status(500).json(errorMsg('no date'))
  }

  const maxList = await prisma.log.findMany({
    select: {
      time: true,
      num: true,
      spot: true,
    },
    where: {
      time: time?.time,
      spotid: {
        notIn: [102, 107, 104, 106],
      },
    } as Prisma.logFindManyArgs['where'],
    orderBy: {
      num: 'desc',
    },
    take: 5,
  })

  res.status(200).json(maxList)
  return
}

export default handler
