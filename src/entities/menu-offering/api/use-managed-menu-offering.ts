import { useSuspenseQuery } from "@tanstack/react-query"
import { managedMenuOfferingQueryOptions } from "./menu-offering-query-options"

export function useManagedMenuOffering(id: number) {
  return useSuspenseQuery(managedMenuOfferingQueryOptions(id))
}
