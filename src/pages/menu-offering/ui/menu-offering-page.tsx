import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import type { Vendor } from "@/entities/vendor/model/vendors"
import { MenuOfferingHero } from "./menu-offering-hero"
import { MenuOfferingSummary } from "./menu-offering-summary"
import { OrderPreviewBar } from "./order-preview-bar"

export function MenuOfferingPage({
  offering,
  vendor,
}: {
  offering: MenuOffering
  vendor: Vendor
}) {
  return (
    <main className="mx-auto w-full max-w-6xl pb-28 md:px-6 md:pb-12 md:pt-8">
      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10 lg:gap-16">
        <MenuOfferingHero offering={offering} />
        <div className="px-4 md:px-0 md:pt-4">
          <MenuOfferingSummary offering={offering} vendor={vendor} />
          <OrderPreviewBar
            priceCents={offering.priceCents}
            itemName={offering.name}
          />
        </div>
      </div>
    </main>
  )
}
