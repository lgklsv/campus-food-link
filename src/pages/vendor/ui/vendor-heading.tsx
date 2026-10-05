import { formatEstimatedTime } from "@/entities/vendor/lib/format-estimated-time"
import type { VendorDetails } from "@/entities/vendor/model/vendor-details"

export function VendorHeading({ vendor }: { vendor: VendorDetails }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {vendor.name}
      </h1>
      <div className="mt-3 flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Estimated{" "}
          {formatEstimatedTime(
            vendor.estimatedMinutesMin,
            vendor.estimatedMinutesMax
          )}
        </p>
      </div>
    </div>
  )
}
