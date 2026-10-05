import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MobileTabBar } from "@/widgets/app-navigation/ui/mobile-tab-bar"

export const Route = createFileRoute("/_app/_tabs")({
  component: TabsLayout,
})

function TabsLayout() {
  const { user } = Route.useRouteContext()
  return (
    <>
      <Outlet />
      <MobileTabBar user={user} />
    </>
  )
}
