import type { Role } from "@/entities/account/model/role"

const studentLinks = [
  { to: "/", label: "Catalog", icon: "catalog" },
  { to: "/cart", label: "Cart", icon: "cart" },
  { to: "/orders", label: "Orders", icon: "orders" },
] as const
const vendorLinks = [
  { to: "/vendor", label: "Vendor", icon: "vendor" },
] as const

export function getNavigation(role: Role) {
  return role === "student"
    ? studentLinks
    : role === "vendor"
      ? vendorLinks
      : []
}
