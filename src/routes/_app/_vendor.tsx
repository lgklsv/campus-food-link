import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getRoleHome } from "@/entities/account/model/role"

export const Route = createFileRoute("/_app/_vendor")({
  beforeLoad: ({ context }) => {
    if (context.user.role !== "vendor") {
      throw redirect({ to: getRoleHome(context.user.role), replace: true })
    }
  },
  component: Outlet,
})
