import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { menuOfferingsQueryOptions } from "@/entities/menu-offering/api/menu-offering-query-options"
import { CatalogPage } from "@/pages/catalog/ui/catalog-page"

export const Route = createFileRoute("/_app/_tabs/_student/")({
  loader: async ({ context }) => {
    await context.queryClient.query(menuOfferingsQueryOptions())
  },
  component: () => (
    <TabPageLayout className="pt-0 md:pt-6">
      <CatalogPage />
    </TabPageLayout>
  ),
})
