import { Minus, Plus } from "lucide-react"
import { formatMenuPrice } from "@/entities/menu-offering/lib/format-menu-price"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"

export function CartItem({
  offering,
  quantity,
}: {
  offering: MenuOffering
  quantity: number
}) {
  return (
    <article className="flex items-center gap-4 py-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-medium leading-snug sm:text-lg">
          {offering.name}
        </h2>
        <Badge variant="secondary" className="mt-2">
          {formatMenuPrice(offering.priceCents)}
        </Badge>
        <div className="mt-4">
          <fieldset className="inline-flex h-9 items-center rounded-full border border-border">
            <legend className="sr-only">{offering.name} quantity</legend>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Decrease ${offering.name} quantity`}
            >
              <Minus aria-hidden="true" />
            </Button>
            <span className="w-7 text-center text-sm font-medium tabular-nums">
              {quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Increase ${offering.name} quantity`}
            >
              <Plus aria-hidden="true" />
            </Button>
          </fieldset>
        </div>
      </div>
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-secondary">
        <img
          src={offering.image}
          alt=""
          width={112}
          height={112}
          className="absolute inset-0 size-full object-contain p-2"
        />
      </div>
    </article>
  )
}
