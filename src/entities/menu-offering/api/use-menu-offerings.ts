import { useSuspenseQuery } from "@tanstack/react-query"
import { menuOfferingsQueryOptions } from "./menu-offering-query-options"

export function useMenuOfferings() {
  return useSuspenseQuery(menuOfferingsQueryOptions())
}
