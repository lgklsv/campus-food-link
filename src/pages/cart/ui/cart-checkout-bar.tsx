import { formatMenuPrice } from "@/entities/menu-offering/lib/format-menu-price"
import { Button } from "@/shared/ui/button"

export function CartCheckoutBar({ totalCents }: { totalCents: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:static md:border-0 md:p-0">
      <Button
        type="button"
        size="lg"
        className="mx-auto flex h-11 w-full max-w-md justify-between px-4 md:max-w-none"
      >
        <span>Place Order</span>
        <span className="tabular-nums">{formatMenuPrice(totalCents)}</span>
      </Button>
    </div>
  )
}
