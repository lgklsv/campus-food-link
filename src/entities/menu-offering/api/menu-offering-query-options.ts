import { queryOptions } from "@tanstack/react-query"
import { getManagedMenuItem } from "./get-managed-menu-item"
import { getManagedMenuItems } from "./get-managed-menu-items"
import { getMenuItemById } from "./get-menu-item-by-id"
import { getMenuItems } from "./get-menu-items"
import { menuOfferingQueryKeys } from "./menu-offering-query-keys"

export function managedMenuOfferingQueryOptions(id: number) {
  return queryOptions({
    queryKey: menuOfferingQueryKeys.managedDetail(id),
    queryFn: ({ signal }) => getManagedMenuItem({ data: { id }, signal }),
  })
}

export function managedMenuOfferingsQueryOptions() {
  return queryOptions({
    queryKey: menuOfferingQueryKeys.managed,
    queryFn: ({ signal }) => getManagedMenuItems({ signal }),
  })
}

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
