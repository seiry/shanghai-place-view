import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
  errorFormat: 'pretty',
})
prisma.$on('query', (e) => {
  console.log(e)
})
export default prisma
