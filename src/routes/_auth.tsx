import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { AuthPageLayout } from "@/app/layouts/auth-page-layout"
import { getSession } from "@/entities/account/api/get-session"
import { getRoleHome } from "@/entities/account/model/role"

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await getSession()
    if (session)
      throw redirect({ to: getRoleHome(session.user.role), replace: true })
  },
  component: () => (
    <AuthPageLayout>
      <Outlet />
    </AuthPageLayout>
  ),
})
