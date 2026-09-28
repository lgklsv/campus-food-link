import { Link } from "@tanstack/react-router"
import { cn } from "cn"
import { Avatar } from "@/shared/ui/avatar"
import { Logo } from "@/shared/ui/logo"

const linkClass =
  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const activeClass =
  "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-30 hidden border-b border-border/70 bg-background md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          to="/"
          aria-label="Campus Food Link home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Logo />
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            Catalog
          </Link>
          <Link
            to="/cart"
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            Orders
          </Link>
          <Link
            to="/account"
            className={cn(linkClass, "flex items-center gap-2 py-1.5 pr-2")}
            activeProps={{
              className: cn(activeClass, "flex items-center gap-2 py-1.5 pr-2"),
            }}
          >
            Account
            <Avatar name="Account" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
