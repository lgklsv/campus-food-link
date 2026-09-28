import { CatalogCategories } from "./catalog-categories"
import { CatalogHeader } from "./catalog-header"
import { CatalogSearch } from "./catalog-search"

export function CatalogToolbar() {
  return (
    <div className="sticky top-0 z-20 bg-background pb-3 pt-[env(safe-area-inset-top)] md:top-16 md:pt-0">
      <CatalogHeader />
      <div className="space-y-4">
        <CatalogSearch />
        <CatalogCategories />
      </div>
    </div>
  )
}
