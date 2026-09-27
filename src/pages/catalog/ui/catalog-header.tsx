import { Logo } from "@/shared/ui/logo"

export function CatalogHeader() {
  return (
    <div className="sticky top-0 z-20 -mx-4 -mt-8 bg-background px-4 pt-[env(safe-area-inset-top)] md:static md:mx-0 md:mt-0 md:px-0 md:pt-0">
      <header className="mx-auto flex min-h-24 max-w-md items-center justify-between gap-4 md:hidden">
        <Logo />
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          $125
        </span>
      </header>
    </div>
  )
}
