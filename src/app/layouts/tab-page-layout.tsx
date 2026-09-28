import { cn } from "cn"
import type { ReactNode } from "react"
import { MobileTabBar } from "@/widgets/app-navigation/ui/mobile-tab-bar"

export function TabPageLayout({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <main
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:px-6",
          className
        )}
      >
        {children}
      </main>
      <MobileTabBar />
    </>
  )
}
