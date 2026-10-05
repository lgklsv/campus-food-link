import { env } from "cloudflare:workers"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { requireSessionMiddleware } from "@/server/auth/require-session-middleware"
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

    const { imageKey, ...details } = vendor
    return {
      ...details,
      imageUrl: `${env.IMAGE_BASE_URL.replace(/\/$/, "")}/${imageKey}`,
    }
  })
