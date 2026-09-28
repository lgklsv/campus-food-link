import { Logo } from "@/shared/ui/logo"

export function CatalogHeader() {
  return (
    <header className="mx-auto flex py-4 max-w-md items-center justify-between gap-4 md:hidden">
      <Logo />
      <span className="text-2xl font-semibold tracking-tight tabular-nums">
        $125
      </span>
    </header>
  )
}
