import { notFound } from "@tanstack/react-router"
import { useManagedMenuOffering } from "@/entities/menu-offering/api/use-managed-menu-offering"
import { EditMenuItemForm } from "@/features/edit-menu-item/ui/edit-menu-item-form"
import { BackButton } from "@/features/navigate-back/ui/back-button"

export function EditMenuItemPage({ id }: { id: number }) {
  const { data: offering } = useManagedMenuOffering(id)
  if (!offering) throw notFound()
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:px-6 md:pb-12 md:pt-8">
      <header className="mb-6 flex items-center gap-3">
        <BackButton fallbackTo="/vendor" />
        <h1 className="sr-only">Edit Menu Item</h1>
      </header>
      <EditMenuItemForm key={offering.id} offering={offering} />
    </main>
  )
}
