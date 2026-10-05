import { ChevronRight } from "lucide-react"
import { formatEstimatedTime } from "../lib/format-estimated-time"
import type { VendorDetails } from "../model/vendor-details"

export function VendorCard({
  vendor,
}: {
  vendor: Omit<VendorDetails, "menuItems">
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-secondary">
        <img
          src={vendor.imageUrl}
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
          Estimated{" "}
          {formatEstimatedTime(
            vendor.estimatedMinutesMin,
            vendor.estimatedMinutesMax
          )}
        </p>
      </div>
      <ChevronRight
        aria-hidden="true"
        className="ml-auto size-5 shrink-0 text-muted-foreground"
      />
    </div>
  )
}
