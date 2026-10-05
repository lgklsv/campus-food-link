import { createFileRoute, notFound } from "@tanstack/react-router"
import { menuOfferingQueryOptions } from "@/entities/menu-offering/api/menu-offering-query-options"
import { MenuOfferingPage } from "@/pages/menu-offering/ui/menu-offering-page"

export const Route = createFileRoute("/_app/_student/menu/$offeringId")({
  loader: async ({ context, params }) => {
    if (!/^[1-9]\d*$/.test(params.offeringId)) throw notFound()
    const id = Number(params.offeringId)
    if (!Number.isSafeInteger(id) || id > 2_147_483_647) throw notFound()
    const offering = await context.queryClient.query(
      menuOfferingQueryOptions(id)
    )
    if (!offering) throw notFound()
    return { id }
  },
  component: MenuOfferingRoute,
})

function MenuOfferingRoute() {
  const { id } = Route.useLoaderData()
  return <MenuOfferingPage id={id} />
}
