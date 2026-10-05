import { notFound } from "@tanstack/react-router"
import { useVendorBySlug } from "@/entities/vendor/api/use-vendor-by-slug"
import { MenuOfferingGrid } from "@/widgets/menu-offering-grid/ui/menu-offering-grid"
import { VendorCategories } from "./vendor-categories"
import { VendorHeading } from "./vendor-heading"
import { VendorHero } from "./vendor-hero"

export function VendorPage({
  slug,
  categories,
}: {
  slug: string
  categories: string[]
}) {
  const { data: vendor } = useVendorBySlug(slug)
  if (!vendor) throw notFound()

  return (
    <main className="mx-auto w-full max-w-6xl pb-12 md:px-6 md:pt-8">
      <VendorHero vendor={vendor} />
      <div className="space-y-6 px-4 pt-6 md:px-0 md:pt-8">
        <VendorHeading vendor={vendor} />
        <VendorCategories categories={categories} />
        <MenuOfferingGrid
          offerings={vendor.menuItems}
          label={`${vendor.name} menu`}
        />
      </div>
    </main>
  )
}
