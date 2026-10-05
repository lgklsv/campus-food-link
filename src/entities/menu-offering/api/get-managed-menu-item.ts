import { createServerFn } from "@tanstack/react-start"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import { getImageUrl } from "@/server/lib/image-url.server"
import { findMenuItemById } from "@/server/repositories/menu-items.server"
import { findVendorByOwner } from "@/server/repositories/vendors.server"
import { updateMenuItemSchema } from "../model/update-menu-item-schema"

export const getManagedMenuItem = createServerFn({ method: "GET" })
  .middleware([requireVendorMiddleware])
  .validator(updateMenuItemSchema.pick({ id: true }))
  .handler(async ({ context, data }) => {
    const vendor = await findVendorByOwner(context.db, context.user.id)
    if (!vendor) return null
    const item = await findMenuItemById(context.db, data.id, vendor.id)
    if (!item) return null
    const { imageKey, vendor: _vendor, ...fields } = item
    return { ...fields, imageUrl: getImageUrl(imageKey) }
  })
