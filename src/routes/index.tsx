import { createFileRoute } from "@tanstack/react-router"
import { TabPageLayout } from "@/app/layouts/tab-page-layout"
import { CatalogPage } from "@/pages/catalog/ui/catalog-page"

export const Route = createFileRoute("/")({
  component: () => (
    <TabPageLayout className="pt-0 md:pt-6">
      <CatalogPage />
    </TabPageLayout>
  ),
})
