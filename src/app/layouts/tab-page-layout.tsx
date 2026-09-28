import { cn } from "cn"
import type { ReactNode } from "react"

export function TabPageLayout({
  children,
  surface = "default",
  className,
}: {
  children: ReactNode
  surface?: "default" | "secondary"
  className?: string
}) {
  return (
    <main
      className={cn(
        "min-h-svh w-full md:min-h-[calc(100svh-4rem)]",
        surface === "secondary" && "bg-secondary"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:px-6",
          className
        )}
      >
        {children}
      </div>
    </main>
  )
}
