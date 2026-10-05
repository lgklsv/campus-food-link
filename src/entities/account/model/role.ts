export type Role = "student" | "vendor" | "admin"

export function getRoleHome(role: Role) {
  switch (role) {
    case "student":
      return "/" as const
    case "vendor":
      return "/vendor" as const
    case "admin":
      return "/account" as const
  }
}
