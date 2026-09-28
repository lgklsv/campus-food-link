import { CatalogCategories } from "./catalog-categories"
import { CatalogHeader } from "./catalog-header"
import { CatalogItemList } from "./catalog-item-list"
import { CatalogSearch } from "./catalog-search"

export function CatalogPage() {
  return (
    <>
      <h1 className="sr-only">Catalog</h1>
      <div className="sticky top-0 z-20 bg-background pb-3 pt-[env(safe-area-inset-top)] md:top-16 md:pt-0">
        <CatalogHeader />
        <div className="space-y-4">
          <CatalogSearch />
          <CatalogCategories />
        </div>
      </div>
      <CatalogItemList />
    </>
  )
}
