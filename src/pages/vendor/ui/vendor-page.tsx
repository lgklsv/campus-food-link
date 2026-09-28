import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import type { Vendor } from "@/entities/vendor/model/vendors"
import { MenuOfferingGrid } from "@/widgets/menu-offering-grid/ui/menu-offering-grid"
import { VendorCategories } from "./vendor-categories"
import { VendorHeading } from "./vendor-heading"
import { VendorHero } from "./vendor-hero"

export function VendorPage({
  vendor,
  offerings,
}: {
  vendor: Vendor
  offerings: MenuOffering[]
}) {
  return (
    <main className="mx-auto w-full max-w-6xl pb-12 md:px-6 md:pt-8">
      <VendorHero vendor={vendor} />
      <div className="space-y-6 px-4 pt-6 md:px-0 md:pt-8">
        <VendorHeading vendor={vendor} />
        <VendorCategories categories={vendor.categories} />
        <MenuOfferingGrid offerings={offerings} label={`${vendor.name} menu`} />
      </div>
    </main>
  )
}
