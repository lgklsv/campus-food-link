import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { requireSessionMiddleware } from "@/server/auth/require-session-middleware"
import { getImageUrl } from "@/server/lib/image-url.server"
import { listAvailableMenuItems } from "@/server/repositories/menu-items.server"
import { findVendorBySlug } from "@/server/repositories/vendors.server"

export const getVendorBySlug = createServerFn({ method: "GET" })
  .middleware([requireSessionMiddleware])
  .validator(
    z.object({
      slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Enter a valid vendor slug."),
    })
  )
  .handler(async ({ context, data }) => {
    const vendor = await findVendorBySlug(context.db, data.slug)
    if (!vendor) return null

    const items = await listAvailableMenuItems(context.db, vendor.id)
    const { imageKey, ...details } = vendor
    return {
      ...details,
      imageUrl: getImageUrl(imageKey),
      menuItems: items.map(({ imageKey, ...item }) => ({
        ...item,
        imageUrl: getImageUrl(imageKey),
      })),
    }
  })
