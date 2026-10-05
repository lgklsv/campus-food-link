import { useMenuOfferings } from "@/entities/menu-offering/api/use-menu-offerings"
import { MenuOfferingGrid } from "@/widgets/menu-offering-grid/ui/menu-offering-grid"
import { CatalogToolbar } from "./catalog-toolbar"

export function CatalogPage() {
  const { data: menuOfferings } = useMenuOfferings()
  return (
    <>
      <h1 className="sr-only">Catalog</h1>
      <CatalogToolbar />
      <MenuOfferingGrid offerings={menuOfferings} label="Catalog items" />
    </>
  )
}
