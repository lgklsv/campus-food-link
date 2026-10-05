import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"

export const Route = createFileRoute("/_app/_tabs/_vendor/vendor")({
  component: () => (
    <TabPageLayout>
      <h1 className="text-3xl font-semibold tracking-tight">Vendor</h1>
    </TabPageLayout>
  ),
})
