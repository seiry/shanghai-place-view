import { sqliteTable, text, index, int } from 'drizzle-orm/sqlite-core'
import type { InferModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const log = sqliteTable(
  'log',
  {
    logId: int('logId').primaryKey(),
    spotId: int('spotId')
      .notNull()
      .references(() => spot.spotId),
    num: int('num'),
    dayNum: int('dayNum'),
    time: int('time'), //datetime
  },
  (log) => ({
    spotIdIndex: index('spotIdIndex').on(log.spotId),
    timeIndex: index('timeIndex').on(log.time),
  }),
)

export const spot = sqliteTable(
  'spot',
  {
    spotId: int('spotId').primaryKey(),
    name: text('name').default(''),

    // logId: integer('logId').references(() => log.spotId),
  },
  (spot) => ({
    idIndex: index('idIndex').on(spot.spotId),
    nameIndex: index('nameIndex').on(spot.name),
  }),
)

export type Log = InferModel<typeof log> // return type when queried
export type Spot = InferModel<typeof spot> // return type when queried

export type InsertLog = InferModel<typeof log, 'insert'> // insert type
export type InsertSpot = InferModel<typeof spot, 'insert'> // insert type

export const insertLogSchema = createInsertSchema(log)
export const insertSpotSchema = createInsertSchema(spot)

export const selectSpotSchema = createSelectSchema(spot)
export const selectLogSchema = createSelectSchema(log).and(selectSpotSchema)
