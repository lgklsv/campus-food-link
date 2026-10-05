import { useSuspenseQuery } from "@tanstack/react-query"
import { managedMenuOfferingsQueryOptions } from "./menu-offering-query-options"

export function useManagedMenuOfferings() {
  return useSuspenseQuery(managedMenuOfferingsQueryOptions())
}
