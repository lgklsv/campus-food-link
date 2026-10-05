import { createFileRoute, notFound } from "@tanstack/react-router"
import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"
import { vendors } from "@/entities/vendor/model/vendors"
import { MenuOfferingPage } from "@/pages/menu-offering/ui/menu-offering-page"

export const Route = createFileRoute("/_app/menu/$offeringId")({
  loader: ({ params }) => {
    const offering = menuOfferings.find(
      (entry) => entry.id === params.offeringId
    )
    if (!offering) throw notFound()
    const vendor = vendors.find((entry) => entry.id === offering.vendorId)
    if (!vendor) throw notFound()
    return { offering, vendor }
  },
  component: MenuOfferingRoute,
})

function MenuOfferingRoute() {
  const { offering, vendor } = Route.useLoaderData()
  return <MenuOfferingPage offering={offering} vendor={vendor} />
}
