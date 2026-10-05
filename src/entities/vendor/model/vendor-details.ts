import type { getVendorBySlug } from "../api/get-vendor-by-slug"

export type VendorDetails = NonNullable<
  Awaited<ReturnType<typeof getVendorBySlug>>
>
