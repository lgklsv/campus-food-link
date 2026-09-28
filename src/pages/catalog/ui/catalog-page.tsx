import { CatalogCategories } from "./catalog-categories"
import { CatalogHeader } from "./catalog-header"
import { CatalogSearch } from "./catalog-search"

export function CatalogPage() {
  return (
    <>
      <CatalogHeader />
      <div className="mt-1 space-y-4">
        <CatalogSearch />
        <CatalogCategories />
      </div>
    </>
  )
}
