import { sql } from "drizzle-orm"
import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { user } from "./auth"

export const vendors = pgTable(
  "vendors",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    imageKey: text("image_key").notNull(),
    estimatedMinutesMin: integer("estimated_minutes_min").notNull(),
    estimatedMinutesMax: integer("estimated_minutes_max").notNull(),
    ownerUserId: text("owner_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("vendors_owner_user_id_idx").on(table.ownerUserId),
    check(
      "vendors_estimated_minutes_min_nonnegative",
      sql`${table.estimatedMinutesMin} >= 0`
    ),
    check(
      "vendors_estimated_minutes_range",
      sql`${table.estimatedMinutesMax} >= ${table.estimatedMinutesMin}`
    ),
  ]
)
