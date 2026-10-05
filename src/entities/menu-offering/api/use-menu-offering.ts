import { useSuspenseQuery } from "@tanstack/react-query"
import { menuOfferingQueryOptions } from "./menu-offering-query-options"

export function useMenuOffering(id: number) {
  return useSuspenseQuery(menuOfferingQueryOptions(id))
}
