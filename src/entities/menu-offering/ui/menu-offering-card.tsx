import { Badge } from "@/shared/ui/badge"
import { formatMenuPrice } from "../lib/format-menu-price"
import type { MenuOffering } from "../model/menu-offerings"

export function MenuOfferingCard({
  offering,
  priority = false,
}: {
  offering: MenuOffering
  priority?: boolean
}) {
  return (
    <article className="min-w-0">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-secondary">
        <img
          src={offering.image}
          alt=""
          width={640}
          height={640}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-contain p-3 sm:p-5"
        />
      </div>
      <div className="space-y-1 px-1 pt-2">
        <h2 className="text-sm font-medium leading-snug sm:text-lg">
          {offering.name}
        </h2>
        <Badge variant="secondary">
          {formatMenuPrice(offering.priceCents)}
        </Badge>
      </div>
    </article>
  )
}
