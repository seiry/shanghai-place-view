import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient({
//   log: [{ level: 'query', emit: 'event' }],
//   errorFormat: 'pretty',
// })
// prisma.$on('query', (e) => {
//   console.log(e)
// })

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}
declare const global: CustomNodeJsGlobal
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'warn', 'error'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
