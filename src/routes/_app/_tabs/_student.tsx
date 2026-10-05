import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getRoleHome } from "@/entities/account/model/role"

export const Route = createFileRoute("/_app/_tabs/_student")({
  beforeLoad: ({ context }) => {
    if (context.user.role !== "student") {
      throw redirect({ to: getRoleHome(context.user.role), replace: true })
    }
  },
  component: Outlet,
})
