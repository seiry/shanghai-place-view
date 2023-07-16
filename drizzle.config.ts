import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config()
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    authToken: process.env.DATABASE_AUTH_TOKEN,
    url: process.env.DATABASE_URL,
  },
} satisfies Config
