import { Link } from "@tanstack/react-router"
import { ForkKnife, ReceiptText, ShoppingCart } from "lucide-react"
import { Avatar } from "@/shared/ui/avatar"

const linkClass =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
const activeClass = "text-primary"

export function MobileTabBar() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-background/95 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          <ForkKnife className="size-5" aria-hidden="true" />
          Catalog
        </Link>
        <Link
          to="/cart"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          <ShoppingCart className="size-5" aria-hidden="true" />
          Cart
        </Link>
        <Link
          to="/orders"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          <ReceiptText className="size-5" aria-hidden="true" />
          Orders
        </Link>
        <Link
          to="/account"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          <Avatar name="Account" className="size-6 text-[9px]" />
          Account
        </Link>
      </div>
    </nav>
  )
}
