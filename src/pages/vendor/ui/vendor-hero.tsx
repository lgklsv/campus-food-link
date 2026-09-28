import type { Vendor } from "@/entities/vendor/model/vendors"
import { BackButton } from "@/features/navigate-back/ui/back-button"

export function VendorHero({ vendor }: { vendor: Vendor }) {
  return (
    <div className="relative aspect-[1.65] overflow-hidden rounded-b-3xl bg-secondary sm:aspect-[2.2] md:aspect-[3] md:rounded-3xl">
      <img
        src={vendor.image}
        alt=""
        width={1440}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="size-full object-cover"
      />
      <BackButton fallbackTo="/" className="absolute left-4 top-4" />
    </div>
  )
}
