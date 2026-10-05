import { useSuspenseQuery } from "@tanstack/react-query"
import { vendorQueryOptions } from "./vendor-query-options"

export function useVendorBySlug(slug: string) {
  return useSuspenseQuery(vendorQueryOptions(slug))
}
