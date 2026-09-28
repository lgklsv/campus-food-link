import { ChevronRight } from "lucide-react"
import type { Vendor } from "../model/vendors"

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-secondary">
        <img
          src={vendor.image}
          alt=""
          width={48}
          height={48}
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium">{vendor.name}</p>
        <p className="text-sm text-muted-foreground">
          Estimated {vendor.estimatedMinutes}
        </p>
      </div>
      <ChevronRight
        aria-hidden="true"
        className="ml-auto size-5 shrink-0 text-muted-foreground"
      />
    </div>
  )
}
