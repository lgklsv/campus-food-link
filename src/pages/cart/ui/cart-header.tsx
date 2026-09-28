import { BackButton } from "@/features/navigate-back/ui/back-button"

export function CartHeader() {
  return (
    <header className="mx-auto flex min-h-20 max-w-md items-center justify-between gap-4 md:min-h-0 md:max-w-none">
      <BackButton fallbackTo="/" />
      <h1 className="sr-only">Cart</h1>
      <span className="text-2xl font-semibold tracking-tight tabular-nums">
        $125
      </span>
    </header>
  )
}
