import type { MenuOffering } from "@/entities/menu-offering/model/menu-offerings"
import { BackButton } from "@/features/navigate-back/ui/back-button"

export function MenuOfferingHero({ offering }: { offering: MenuOffering }) {
  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-b-3xl bg-secondary md:rounded-3xl">
      <img
        src={offering.image}
        alt=""
        width={640}
        height={640}
        loading="eager"
        fetchPriority="high"
        className="h-full w-full object-contain p-5 sm:p-8"
      />
      <BackButton fallbackTo="/" className="absolute left-4 top-4" />
    </div>
  )
}
