import { Minus, Plus } from "lucide-react"
import { formatMenuPrice } from "@/entities/menu-offering/lib/format-menu-price"
import { Button } from "@/shared/ui/button"

export function OrderPreviewBar({ priceCents }: { priceCents: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 md:static md:mt-8 md:border-0 md:px-0 md:pb-0 md:pt-0">
      <div className="mx-auto flex max-w-md gap-3 md:max-w-none">
        <fieldset className="flex h-11 shrink-0 items-center rounded-full border border-border">
          <legend className="sr-only">Quantity</legend>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
          >
            <Minus aria-hidden="true" />
          </Button>
          <span className="w-7 text-center text-sm font-medium tabular-nums">
            1
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
          >
            <Plus aria-hidden="true" />
          </Button>
        </fieldset>
        <Button
          type="button"
          size="lg"
          className="h-11 min-w-0 flex-1 justify-between px-4"
        >
          <span>Add to Order</span>
          <span className="tabular-nums">{formatMenuPrice(priceCents)}</span>
        </Button>
      </div>
    </div>
  )
}
