import { NextApiHandler } from 'next'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const allPosts = await prisma.contents.findMany({
    select: {
      title: true,
      created: true,
      slug: true,
      user: true,
      relationship: {
        select: {
          meta: true,
        },
      },
    },
    where: {
      password: {
        // not: null,
      },
    },
    // include: {
    //   typecho_users: {
    //     select: {
    //       screenName: true,
    //     },
    //   },
    // },
  })

  res.status(200).json([])
}

export default handler
