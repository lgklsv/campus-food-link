import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { AccountPage } from "@/pages/account/ui/account-page"

export const Route = createFileRoute("/account/")({
  component: () => (
    <TabPageLayout>
      <AccountPage />
    </TabPageLayout>
  ),
})
