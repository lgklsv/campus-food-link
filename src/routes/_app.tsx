import { createFileRoute, Outlet } from "@tanstack/react-router"
import { DesktopHeader } from "@/widgets/app-navigation/ui/desktop-header"

export const Route = createFileRoute("/_app")({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="min-h-svh">
      <DesktopHeader />
      <Outlet />
    </div>
  )
}
