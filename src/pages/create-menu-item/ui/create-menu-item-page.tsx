import { CreateMenuItemForm } from "@/features/create-menu-item/ui/create-menu-item-form"
import { BackButton } from "@/features/navigate-back/ui/back-button"

export function CreateMenuItemPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:px-6 md:pb-12 md:pt-8">
      <header className="mb-6 flex items-center gap-3">
        <BackButton fallbackTo="/vendor" />
        <h1 className="sr-only">Add Menu Item</h1>
      </header>
      <CreateMenuItemForm />
    </main>
  )
}
