import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'

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

    logId: integer('logId').references(() => log.spotId),
  },
  (SPOT) => ({
    spotIdIndex: index('spotIdIndex').on(SPOT.spotId),
    nameIndex: index('nameIndex').on(SPOT.name),
  }),
)
