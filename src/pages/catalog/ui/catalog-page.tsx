import { CatalogGrid } from "./catalog-grid"
import { CatalogToolbar } from "./catalog-toolbar"

export function CatalogPage() {
  return (
    <>
      <h1 className="sr-only">Catalog</h1>
      <CatalogToolbar />
      <CatalogGrid />
    </>
  )
}
