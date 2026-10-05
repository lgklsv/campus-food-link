import type { getMenuItemById } from "../api/get-menu-item-by-id"
import type { getMenuItems } from "../api/get-menu-items"

export type MenuOffering = Awaited<ReturnType<typeof getMenuItems>>[number]
export type MenuOfferingDetails = NonNullable<
  Awaited<ReturnType<typeof getMenuItemById>>
>
