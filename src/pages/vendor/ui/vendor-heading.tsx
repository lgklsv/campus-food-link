import type { Vendor } from "@/entities/vendor/model/vendors"
import { Badge } from "@/shared/ui/badge"

export function VendorHeading({ vendor }: { vendor: Vendor }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {vendor.name}
      </h1>
      <div className="mt-3 flex items-center gap-3">
        <Badge variant="success">Open</Badge>
        <p className="text-sm text-muted-foreground">
          Estimated {vendor.estimatedMinutes}
        </p>
      </div>
    </div>
  )
}
