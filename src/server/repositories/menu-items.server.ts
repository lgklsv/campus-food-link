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

export async function findMenuItemById(db: NodePgDatabase, id: number) {
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
    .where(eq(menuItems.id, id))
    .limit(1)

  return item ?? null
}
