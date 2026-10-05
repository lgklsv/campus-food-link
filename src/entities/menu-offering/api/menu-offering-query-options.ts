import { queryOptions } from "@tanstack/react-query"
import { getMenuItemById } from "./get-menu-item-by-id"
import { getMenuItems } from "./get-menu-items"
import { menuOfferingQueryKeys } from "./menu-offering-query-keys"

export function menuOfferingsQueryOptions() {
  return queryOptions({
    queryKey: menuOfferingQueryKeys.catalog,
    queryFn: ({ signal }) => getMenuItems({ signal }),
  })
}

export function menuOfferingQueryOptions(id: number) {
  return queryOptions({
    queryKey: menuOfferingQueryKeys.detail(id),
    queryFn: ({ signal }) => getMenuItemById({ data: { id }, signal }),
  })
}
