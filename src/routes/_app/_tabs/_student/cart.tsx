import { createFileRoute } from "@tanstack/react-router"
import { CartPage } from "@/pages/cart/ui/cart-page"

export const Route = createFileRoute("/_app/_tabs/_student/cart")({
  component: CartPage,
})
