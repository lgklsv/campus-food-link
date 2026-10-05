import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { managedMenuOfferingsQueryOptions } from "@/entities/menu-offering/api/menu-offering-query-options"
import { VendorMenuPage } from "@/pages/vendor-menu/ui/vendor-menu-page"

export const Route = createFileRoute("/_app/_tabs/_vendor/vendor")({
  loader: async ({ context }) => {
    await context.queryClient.query(managedMenuOfferingsQueryOptions())
  },
  component: () => (
    <TabPageLayout>
      <VendorMenuPage />
    </TabPageLayout>
  ),
})
