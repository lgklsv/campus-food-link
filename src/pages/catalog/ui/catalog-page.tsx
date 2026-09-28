import { menuOfferings } from "@/entities/menu-offering/model/menu-offerings"
import { MenuOfferingGrid } from "@/widgets/menu-offering-grid/ui/menu-offering-grid"
import { CatalogToolbar } from "./catalog-toolbar"

export function CatalogPage() {
  return (
    <>
      <h1 className="sr-only">Catalog</h1>
      <CatalogToolbar />
      <MenuOfferingGrid offerings={menuOfferings} label="Catalog items" />
    </>
  )
}
