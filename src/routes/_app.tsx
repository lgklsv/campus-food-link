import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getSession } from "@/entities/account/api/get-session"
import { DesktopHeader } from "@/widgets/app-navigation/ui/desktop-header"

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) throw redirect({ to: "/login", replace: true })
    return { user: session.user }
  },
  component: AppLayout,
})

function AppLayout() {
  const { user } = Route.useRouteContext()
  return (
    <div className="min-h-svh">
      <DesktopHeader user={user} />
      <Outlet />
    </div>
  )
}
