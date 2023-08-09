import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import type { InferModel } from 'drizzle-orm'

export const log = sqliteTable(
  'log',
  {
    logId: integer('logId').unique().primaryKey(),
    spotId: integer('spotId'),
    num: integer('num'),
    dayNum: integer('dayNum'),
    time: integer('time'), //datetime
  },
  (log) => ({
    spotIdIndex: index('spotIdIndex').on(log.spotId),
    timeIndex: index('timeIndex').on(log.time),
  }),
)

export const spot = sqliteTable(
  'spot',
  {
    spotId: integer('spotId').unique().primaryKey(),
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
