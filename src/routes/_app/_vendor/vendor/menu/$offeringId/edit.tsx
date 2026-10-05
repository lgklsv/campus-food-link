import { createFileRoute, notFound } from "@tanstack/react-router"
import { managedMenuOfferingQueryOptions } from "@/entities/menu-offering/api/menu-offering-query-options"
import { EditMenuItemPage } from "@/pages/edit-menu-item/ui/edit-menu-item-page"

export const Route = createFileRoute(
  "/_app/_vendor/vendor/menu/$offeringId/edit"
)({
  loader: async ({ context, params }) => {
    if (!/^[1-9]\d*$/.test(params.offeringId)) throw notFound()
    const id = Number(params.offeringId)
    if (!Number.isSafeInteger(id) || id > 2_147_483_647) throw notFound()
    const offering = await context.queryClient.query(
      managedMenuOfferingQueryOptions(id)
    )
    if (!offering) throw notFound()
    return { id }
  },
  component: EditMenuItemRoute,
})

function EditMenuItemRoute() {
  const { id } = Route.useLoaderData()
  return <EditMenuItemPage id={id} />
}
