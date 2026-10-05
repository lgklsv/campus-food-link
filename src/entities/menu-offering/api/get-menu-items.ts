import { createServerFn } from "@tanstack/react-start"
import { requireSessionMiddleware } from "@/server/auth/require-session-middleware"
import { getImageUrl } from "@/server/lib/image-url.server"
import { listAvailableMenuItems } from "@/server/repositories/menu-items.server"

export const getMenuItems = createServerFn({ method: "GET" })
  .middleware([requireSessionMiddleware])
  .handler(async ({ context }) => {
    const items = await listAvailableMenuItems(context.db)
    return items.map(({ imageKey, ...item }) => ({
      ...item,
      imageUrl: getImageUrl(imageKey),
    }))
  })
