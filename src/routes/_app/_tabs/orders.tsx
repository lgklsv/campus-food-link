import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { OrdersPage } from "@/pages/orders/ui/orders-page"

export const Route = createFileRoute("/_app/_tabs/orders")({
  component: () => (
    <TabPageLayout>
      <OrdersPage />
    </TabPageLayout>
  ),
})
