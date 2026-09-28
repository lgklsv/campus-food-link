import { Store } from "lucide-react"

export function VendorCard({
  name,
  estimatedMinutes,
}: {
  name: string
  estimatedMinutes: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Store aria-hidden="true" className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          Estimated {estimatedMinutes}
        </p>
      </div>
    </div>
  )
}
