import { mockCartItems } from "../model/mock-cart"
import { CartCheckoutBar } from "./cart-checkout-bar"
import { CartHeader } from "./cart-header"
import { CartItems } from "./cart-items"

const totalCents = mockCartItems.reduce(
  (total, { offering, quantity }) => total + offering.priceCents * quantity,
  0
)

export function CartPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] md:px-6 md:pb-12 md:pt-6">
      <CartHeader />
      <div className="grid gap-8 md:mt-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start lg:gap-12">
        <CartItems />
        <CartCheckoutBar totalCents={totalCents} />
      </div>
    </main>
  )
}
