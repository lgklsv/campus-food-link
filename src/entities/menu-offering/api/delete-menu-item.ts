import { createServerFn } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import { softDeleteMenuItem } from "@/server/repositories/menu-items.server"
import { findVendorByOwner } from "@/server/repositories/vendors.server"
import { updateMenuItemSchema } from "../model/update-menu-item-schema"

export const deleteMenuItem = createServerFn({ method: "POST" })
  .middleware([requireVendorMiddleware])
  .validator(updateMenuItemSchema.pick({ id: true }))
  .handler(async ({ context, data }) => {
    const vendor = await findVendorByOwner(context.db, context.user.id)
    if (!vendor) {
      setResponseStatus(403)
      throw new Error("Your account is not assigned to an establishment.")
    }
    const item = await softDeleteMenuItem(context.db, data.id, vendor.id)
    if (!item) {
      setResponseStatus(404)
      throw new Error("Menu item not found.")
    }
    return { id: item.id, vendorSlug: vendor.slug }
  })
