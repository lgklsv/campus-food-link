import { createServerFn } from "@tanstack/react-start"
import { requireVendorMiddleware } from "@/server/auth/require-vendor-middleware"
import { getImageUrl } from "@/server/lib/image-url.server"
import { listMenuItemsByOwner } from "@/server/repositories/menu-items.server"

export const getManagedMenuItems = createServerFn({ method: "GET" })
  .middleware([requireVendorMiddleware])
  .handler(async ({ context }) => {
    const items = await listMenuItemsByOwner(context.db, context.user.id)
    return items.map(({ imageKey, ...item }) => ({
      ...item,
      imageUrl: getImageUrl(imageKey),
    }))
  })
