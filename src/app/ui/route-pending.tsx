import { LoaderCircle } from "lucide-react"

export function RoutePending() {
  return (
    <div
      role="status"
      className="flex min-h-[60svh] w-full flex-col items-center justify-center gap-3 px-4 py-16 text-sm text-muted-foreground"
    >
      <LoaderCircle
        aria-hidden="true"
        className="size-6 text-primary motion-safe:animate-spin"
      />
      <span>Loading…</span>
    </div>
  )
}
