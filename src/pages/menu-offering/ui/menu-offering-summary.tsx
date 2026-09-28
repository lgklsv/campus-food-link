import { Link } from "@tanstack/react-router"
import { formatMenuPrice } from "@/entities/menu-offering/lib/format-menu-price"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import type { Vendor } from "@/entities/vendor/model/vendors"
import { VendorCard } from "@/entities/vendor/ui/vendor-card"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"

export function MenuOfferingSummary({
  offering,
  vendor,
}: {
  offering: MenuOffering
  vendor: Vendor
}) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {offering.name}
      </h1>
      <Badge variant="secondary" className="mt-3 h-auto px-3 py-1 text-sm">
        {formatMenuPrice(offering.priceCents)}
      </Badge>
      <p className="mt-5 text-sm leading-6 text-muted-foreground md:text-base">
        {offering.description}
      </p>
      {offering.portionGrams ? (
        <p className="mt-2 text-sm font-medium">{offering.portionGrams} g</p>
      ) : null}

      <Separator className="mt-6" />
      <div className="pt-5">
        <Link
          to="/vendors/$vendorId"
          params={{ vendorId: vendor.id }}
          className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <VendorCard vendor={vendor} />
        </Link>
      </div>
    </>
  )
}
