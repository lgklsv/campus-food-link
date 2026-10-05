import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AuthPageLayout } from "@/app/layouts/auth-page-layout"

export const Route = createFileRoute("/_auth")({
  component: () => (
    <AuthPageLayout>
      <Outlet />
    </AuthPageLayout>
  ),
})
