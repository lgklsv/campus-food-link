import { createFileRoute, Outlet } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { AccountPage } from "@/pages/account/ui/account-page"

export const Route = createFileRoute("/_app/_tabs/account")({
  component: AccountRoute,
})

function AccountRoute() {
  const { user } = Route.useRouteContext()
  return (
    <TabPageLayout surface="secondary">
      <AccountPage user={user}>
        <Outlet />
      </AccountPage>
    </TabPageLayout>
  )
}
