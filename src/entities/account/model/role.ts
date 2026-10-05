export type Role = "student" | "vendor" | "admin"

export function getRoleHome(role: Role) {
  switch (role) {
    case "student":
      return "/" as const
    case "vendor":
      return "/vendor/menu" as const
    case "admin":
      return "/account" as const
  }
}
