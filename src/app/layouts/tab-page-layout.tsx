import type { ReactNode } from "react"
import { MobileTabBar } from "@/widgets/app-navigation/ui/mobile-tab-bar"

export function TabPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:py-14">
        {children}
      </main>
      <MobileTabBar />
    </>
  )
}
