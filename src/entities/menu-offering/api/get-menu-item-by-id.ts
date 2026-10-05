import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { requireSessionMiddleware } from "@/server/auth/require-session-middleware"
import { getImageUrl } from "@/server/lib/image-url.server"
import { findMenuItemById } from "@/server/repositories/menu-items.server"

export const getMenuItemById = createServerFn({ method: "GET" })
  .middleware([requireSessionMiddleware])
  .validator(z.object({ id: z.number().int().positive().max(2_147_483_647) }))
  .handler(async ({ context, data }) => {
    const item = await findMenuItemById(context.db, data.id)
    if (!item) return null

    const { imageKey, vendor, ...details } = item
    const { imageKey: vendorImageKey, ...vendorDetails } = vendor
    return {
      ...details,
      imageUrl: getImageUrl(imageKey),
      vendor: {
        ...vendorDetails,
        imageUrl: getImageUrl(vendorImageKey),
      },
    }
  })
