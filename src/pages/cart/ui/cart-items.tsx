import { Link } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { Fragment } from "react"
import { buttonVariants } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import { mockCartItems } from "../model/mock-cart"
import { CartItem } from "./cart-item"

export function CartItems() {
  return (
    <section aria-label="Items in cart">
      <div>
        {mockCartItems.map(({ offering, quantity }, index) => (
          <Fragment key={offering.id}>
            {index > 0 ? <Separator /> : null}
            <CartItem offering={offering} quantity={quantity} />
          </Fragment>
        ))}
      </div>
      <Link
        to="/"
        className={buttonVariants({
          variant: "outline",
          className: "w-full",
        })}
      >
        <Plus aria-hidden="true" className="size-4" />
        Add Items
      </Link>
    </section>
  )
}
