import { createFileRoute, notFound } from "@tanstack/react-router"
import { vendorQueryOptions } from "@/entities/vendor/api/vendor-query-options"
import { vendors } from "@/entities/vendor/model/vendors"
import { VendorPage } from "@/pages/vendor/ui/vendor-page"

export const Route = createFileRoute("/_app/_student/vendors/$slug")({
  loader: async ({ context, params }) => {
    const vendor = await context.queryClient.query(
      vendorQueryOptions(params.slug)
    )
    if (!vendor) throw notFound()

    // Categories remain mock data until their database integration.
    const categories = vendors.find((entry) => entry.id === params.slug)
      ?.categories ?? ["All"]
    return { categories }
  },
  component: VendorRoute,
})

function VendorRoute() {
  const { slug } = Route.useParams()
  const { categories } = Route.useLoaderData()
  return <VendorPage slug={slug} categories={categories} />
}
