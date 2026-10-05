import { Link } from "@tanstack/react-router"
import { formatMenuPrice } from "@/entities/menu-offering/lib/format-menu-price"
import type { MenuOfferingDetails } from "@/entities/menu-offering/model/menu-offering"
import { VendorCard } from "@/entities/vendor/ui/vendor-card"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"

export function MenuOfferingSummary({
  offering,
  vendor,
}: {
  offering: MenuOfferingDetails
  vendor: MenuOfferingDetails["vendor"]
}) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {offering.name}
      </h1>
      <Badge variant="secondary" className="mt-3 h-auto px-3 py-1 text-sm">
        {formatMenuPrice(offering.priceCents)}
      </Badge>
      {offering.description ? (
        <p className="mt-5 text-sm leading-6 text-muted-foreground md:text-base">
          {offering.description}
        </p>
      ) : null}

      <Separator className="mt-6" />
      <div className="pt-5">
        <Link
          to="/vendors/$slug"
          params={{ slug: vendor.slug }}
          className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <VendorCard vendor={vendor} />
        </Link>
      </div>
    </>
  )
}
