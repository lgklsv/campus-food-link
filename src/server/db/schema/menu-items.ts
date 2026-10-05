import { sql } from "drizzle-orm"
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { vendors } from "./vendors"

export const menuItems = pgTable(
  "menu_items",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    vendorId: integer("vendor_id")
      .notNull()
      .references(() => vendors.id),
    name: text("name").notNull(),
    description: text("description"),
    imageKey: text("image_key").notNull(),
    priceCents: integer("price_cents").notNull(),
    isAvailable: boolean("is_available").default(true).notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("menu_items_vendor_id_idx").on(table.vendorId),
    check("menu_items_price_nonnegative", sql`${table.priceCents} >= 0`),
  ]
)
