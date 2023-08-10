import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './turso'

migrate(db, { migrationsFolder: 'drizzle' })
