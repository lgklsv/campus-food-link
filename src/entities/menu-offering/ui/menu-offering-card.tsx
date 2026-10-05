import type { ReactNode } from "react"
import { Badge } from "@/shared/ui/badge"
import { formatMenuPrice } from "../lib/format-menu-price"
import type { MenuOffering } from "../model/menu-offering"

export function MenuOfferingCard({
  offering,
  priority = false,
  badge,
  actions,
}: {
  offering: MenuOffering
  priority?: boolean
  badge?: ReactNode
  actions?: ReactNode
}) {
  return (
    <article className="min-w-0">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-secondary">
        <img
          src={offering.imageUrl}
          alt=""
          width={640}
          height={640}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-contain p-3 sm:p-5"
        />
        {badge ? <div className="absolute bottom-3 left-3">{badge}</div> : null}
        {actions ? (
          <div className="absolute right-2 top-2">{actions}</div>
        ) : null}
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
