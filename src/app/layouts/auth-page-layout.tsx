import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Logo } from "@/shared/ui/logo"

export function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="shrink-0">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            to="/"
            aria-label="Campus Food Link home"
            className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Logo />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center px-6 py-12 md:pt-24">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  )
}
