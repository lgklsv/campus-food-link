import { createFileRoute, notFound } from "@tanstack/react-router"
import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"
import { MenuOfferingPage } from "@/pages/menu-offering/ui/menu-offering-page"

export const Route = createFileRoute("/menu/$offeringId")({
  loader: ({ params }) => {
    const offering = menuOfferings.find(
      (entry) => entry.id === params.offeringId
    )
    if (!offering) throw notFound()
    return offering
  },
  component: MenuOfferingRoute,
})

function MenuOfferingRoute() {
  const offering = Route.useLoaderData()
  return <MenuOfferingPage offering={offering} />
}
