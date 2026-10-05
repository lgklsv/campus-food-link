import { EyeOff, Pencil, Trash2 } from "lucide-react"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offering"
import { MenuOfferingCard } from "@/entities/menu-offering/ui/menu-offering-card"
import { MenuItemVisibilityDialog } from "@/features/manage-menu-item/ui/menu-item-visibility-dialog"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { ButtonGroup } from "@/shared/ui/button-group"

export function VendorMenuItemCard({
  offering,
  priority,
}: {
  offering: MenuOffering
  priority: boolean
}) {
  return (
    <MenuOfferingCard
      offering={offering}
      priority={priority}
      badge={
        !offering.isAvailable ? (
          <Badge className="h-6 border-0 bg-black/65 px-2.5 text-white backdrop-blur-sm">
            <EyeOff aria-hidden="true" />
            Hidden
          </Badge>
        ) : undefined
      }
      actions={
        <ButtonGroup
          aria-label={`Actions for ${offering.name}`}
          className="rounded-4xl bg-background shadow-sm"
        >
          <MenuItemVisibilityDialog offering={offering} />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11"
            aria-label={`Edit ${offering.name}`}
            title="Edit"
            disabled
          >
            <Pencil aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 text-destructive"
            aria-label={`Delete ${offering.name}`}
            title="Delete"
            disabled
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </ButtonGroup>
      }
    />
  )
}
