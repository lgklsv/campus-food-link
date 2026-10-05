import { eq } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { vendors } from "../db/schema/vendors"

export async function findVendorByOwner(
  db: NodePgDatabase,
  ownerUserId: string
) {
  const [vendor] = await db
    .select({ id: vendors.id, slug: vendors.slug })
    .from(vendors)
    .where(eq(vendors.ownerUserId, ownerUserId))
    .limit(1)

  return vendor ?? null
}

export async function findVendorBySlug(db: NodePgDatabase, slug: string) {
  const [vendor] = await db
    .select({
      id: vendors.id,
      slug: vendors.slug,
      name: vendors.name,
      imageKey: vendors.imageKey,
      estimatedMinutesMin: vendors.estimatedMinutesMin,
      estimatedMinutesMax: vendors.estimatedMinutesMax,
    })
    .from(vendors)
    .where(eq(vendors.slug, slug))
    .limit(1)

  return vendor ?? null
}
