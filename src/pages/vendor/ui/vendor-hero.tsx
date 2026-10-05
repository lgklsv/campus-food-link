import type { VendorDetails } from "@/entities/vendor/model/vendor-details"
import { BackButton } from "@/features/navigate-back/ui/back-button"

export function VendorHero({ vendor }: { vendor: VendorDetails }) {
  return (
    <div className="relative aspect-[1.65] overflow-hidden rounded-b-3xl bg-secondary sm:aspect-[2.2] md:aspect-[3] md:rounded-3xl">
      <img
        src={vendor.imageUrl}
        alt=""
        width={1440}
        height={900}
        loading="eager"
        fetchPriority="high"
        className="size-full object-cover"
      />
      <BackButton fallbackTo="/" className="absolute left-4 top-4" />
    </div>
  )
}
