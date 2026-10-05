import { queryOptions } from "@tanstack/react-query"
import { getVendorBySlug } from "./get-vendor-by-slug"
import { vendorQueryKeys } from "./vendor-query-keys"

export function vendorQueryOptions(slug: string) {
  return queryOptions({
    queryKey: vendorQueryKeys.detail(slug),
    queryFn: ({ signal }) => getVendorBySlug({ data: { slug }, signal }),
  })
}
