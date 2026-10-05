import { and, asc, eq } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { menuItems } from "../db/schema/menu-items"
import { vendors } from "../db/schema/vendors"

const menuItemFields = {
  id: menuItems.id,
  vendorId: menuItems.vendorId,
  name: menuItems.name,
  description: menuItems.description,
  imageKey: menuItems.imageKey,
  priceCents: menuItems.priceCents,
  isAvailable: menuItems.isAvailable,
}

export async function insertMenuItem(
  db: NodePgDatabase,
  values: typeof menuItems.$inferInsert
) {
  const [item] = await db
    .insert(menuItems)
    .values(values)
    .returning({ id: menuItems.id })
  return item
}

export async function updateMenuItem(
  db: NodePgDatabase,
  id: number,
  vendorId: number,
  values: Partial<
    Pick<
      typeof menuItems.$inferInsert,
      "name" | "description" | "imageKey" | "priceCents" | "isAvailable"
    >
  >
) {
  const [item] = await db
    .update(menuItems)
    .set(values)
    .where(and(eq(menuItems.id, id), eq(menuItems.vendorId, vendorId)))
    .returning({ id: menuItems.id })

  return item ?? null
}

export function listMenuItemsByOwner(db: NodePgDatabase, ownerUserId: string) {
  return db
    .select(menuItemFields)
    .from(menuItems)
    .innerJoin(vendors, eq(menuItems.vendorId, vendors.id))
    .where(eq(vendors.ownerUserId, ownerUserId))
    .orderBy(asc(menuItems.id))
}

export function listAvailableMenuItems(db: NodePgDatabase, vendorId?: number) {
  return db
    .select(menuItemFields)
    .from(menuItems)
    .where(
      and(
        eq(menuItems.isAvailable, true),
        vendorId === undefined ? undefined : eq(menuItems.vendorId, vendorId)
      )
    )
    .orderBy(asc(menuItems.id))
}

export async function findMenuItemById(
  db: NodePgDatabase,
  id: number,
  vendorId?: number
) {
  const [item] = await db
    .select({
      ...menuItemFields,
      vendor: {
        id: vendors.id,
        slug: vendors.slug,
        name: vendors.name,
        imageKey: vendors.imageKey,
        estimatedMinutesMin: vendors.estimatedMinutesMin,
        estimatedMinutesMax: vendors.estimatedMinutesMax,
      },
    })
    .from(menuItems)
    .innerJoin(vendors, eq(menuItems.vendorId, vendors.id))
    .where(
      and(
        eq(menuItems.id, id),
        vendorId === undefined ? undefined : eq(menuItems.vendorId, vendorId)
      )
    )
    .limit(1)

  return item ?? null
}
