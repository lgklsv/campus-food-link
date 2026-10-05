import { createServerFn } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import type { z } from "zod"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import { updateMenuItem as updateMenuItemRecord } from "@/server/repositories/menu-items.server"
import { findVendorByOwner } from "@/server/repositories/vendors.server"
import { updateMenuItemSchema } from "../model/update-menu-item-schema"

export const updateMenuItem = createServerFn({ method: "POST" })
  .middleware([requireVendorMiddleware])
  .validator((data: z.infer<typeof updateMenuItemSchema>) => {
    const parsed = updateMenuItemSchema.safeParse(data)
    if (!parsed.success) {
      setResponseStatus(400)
      throw new Error(
        parsed.error.issues[0]?.message ?? "Invalid menu item update."
      )
    }
    return parsed.data
  })
  .handler(async ({ context, data }) => {
    const vendor = await findVendorByOwner(context.db, context.user.id)
    if (!vendor) {
      setResponseStatus(403)
      throw new Error("Your account is not assigned to an establishment.")
    }
    const changes = { ...data.changes }
    if (changes.description === "") changes.description = null
    const item = await updateMenuItemRecord(
      context.db,
      data.id,
      vendor.id,
      changes
    )
    if (!item) {
      setResponseStatus(404)
      throw new Error("Menu item not found.")
    }
    return { id: item.id, vendorSlug: vendor.slug }
  })
