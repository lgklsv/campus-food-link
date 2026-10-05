import { Link } from "@tanstack/react-router"
import { ForkKnife, ReceiptText, ShoppingCart, Store } from "lucide-react"
import type { authClient } from "@/entities/account/api/auth-client"
import { Avatar } from "@/shared/ui/avatar"
import { getNavigation } from "../model/navigation"

const linkClass =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
const activeClass = "text-primary"

const icons = {
  catalog: ForkKnife,
  cart: ShoppingCart,
  orders: ReceiptText,
  vendor: Store,
}

export function MobileTabBar({
  user,
}: {
  user: typeof authClient.$Infer.Session.user
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-border/70 bg-background/95 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-1">
        {getNavigation(user.role).map((link) => {
          const Icon = icons[link.icon]
          return (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className={linkClass}
              activeProps={{ className: activeClass }}
            >
              <Icon className="size-5" aria-hidden="true" />
              {link.label}
            </Link>
          )
        })}
        <Link
          to="/account"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          <Avatar
            name={user.name}
            src={user.image ?? undefined}
            className="size-6 border border-border/50 bg-background"
          />
          Account
        </Link>
      </div>
    </nav>
  )
}
