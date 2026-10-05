import "dotenv/config"
import { asc, inArray } from "drizzle-orm"
import { menuOfferings } from "../src/entities/menu-offering/model/menu-offerings"
import { createDatabase } from "../src/server/db/connection"
import { menuItems } from "../src/server/db/schema/menu-items"
import { vendors } from "../src/server/db/schema/vendors"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("Set DATABASE_URL in .env before seeding the database.")
}

const demoVendors = [
  {
    slug: "green-bowl",
    name: "Green Bowl",
    imageKey: "vendors/green-bowl.webp",
    estimatedMinutesMin: 10,
    estimatedMinutesMax: 15,
  },
  {
    slug: "campus-grill",
    name: "Campus Grill",
    imageKey: "vendors/campus-grill.webp",
    estimatedMinutesMin: 10,
    estimatedMinutesMax: 15,
  },
  {
    slug: "coffee-corner",
    name: "Coffee Corner",
    imageKey: "vendors/coffee-corner.webp",
    estimatedMinutesMin: 5,
    estimatedMinutesMax: 10,
  },
] satisfies (typeof vendors.$inferInsert)[]

const { client, db } = createDatabase(databaseUrl)
try {
  await client.connect()
  const inserted = await db
    .insert(vendors)
    .values(demoVendors)
    .onConflictDoNothing({ target: vendors.slug })
    .returning({ id: vendors.id })

  const seeded = await db
    .select({ id: vendors.id, slug: vendors.slug })
    .from(vendors)
    .where(
      inArray(
        vendors.slug,
        demoVendors.map((vendor) => vendor.slug)
      )
    )
    .orderBy(asc(vendors.id))

  console.info(
    `Added ${inserted.length} vendors; ${seeded.length} demo vendors available.`
  )
  console.table(seeded)

  await db.transaction(async (tx) => {
    const vendorIds = new Map(seeded.map((vendor) => [vendor.slug, vendor.id]))
    const existingItems = await tx
      .select({ vendorId: menuItems.vendorId, name: menuItems.name })
      .from(menuItems)
      .where(
        inArray(
          menuItems.vendorId,
          seeded.map((vendor) => vendor.id)
        )
      )

    const items = menuOfferings
      .map((offering) => {
        const vendorId = vendorIds.get(offering.vendorId)
        if (vendorId === undefined) {
          throw new Error(`Missing demo vendor: ${offering.vendorId}`)
        }
        return {
          vendorId,
          name: offering.name,
          description: offering.description,
          imageKey: offering.image.replace(/^\//, ""),
          priceCents: offering.priceCents,
          isAvailable: true,
        }
      })
      .filter(
        (item) =>
          !existingItems.some(
            (existing) =>
              existing.vendorId === item.vendorId && existing.name === item.name
          )
      )

    const insertedItems = items.length
      ? await tx.insert(menuItems).values(items).returning({ id: menuItems.id })
      : []
    console.info(`Added ${insertedItems.length} menu items.`)
  })
} finally {
  await client.end()
}
