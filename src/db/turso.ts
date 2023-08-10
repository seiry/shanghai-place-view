import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
if (!process.env.DATABASE_URL) {
  require('dotenv').config()
}
const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client, {
  // logger: true,
})
