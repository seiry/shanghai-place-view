import type { Config } from 'drizzle-kit'
if (!process.env.DATABASE_URL) {
  require('dotenv').config()
}
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect:'turso',
  dbCredentials: {
    authToken: process.env.DATABASE_AUTH_TOKEN,
    url: process.env.DATABASE_URL,
  },
} satisfies Config
