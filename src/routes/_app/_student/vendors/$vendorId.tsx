import { createFileRoute, notFound } from "@tanstack/react-router"
import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"
import { vendors } from "@/entities/vendor/model/vendors"
import { VendorPage } from "@/pages/vendor/ui/vendor-page"

export const Route = createFileRoute("/_app/_student/vendors/$vendorId")({
  loader: ({ params }) => {
    const vendor = vendors.find((entry) => entry.id === params.vendorId)
    if (!vendor) throw notFound()
    const offerings = menuOfferings.filter(
      (offering) => offering.vendorId === vendor.id
    )
    return { vendor, offerings }
  },
  component: VendorRoute,
})

function VendorRoute() {
  const { vendor, offerings } = Route.useLoaderData()
  return <VendorPage vendor={vendor} offerings={offerings} />
}
