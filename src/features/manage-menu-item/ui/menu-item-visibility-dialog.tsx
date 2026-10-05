import { Eye, EyeOff } from "lucide-react"
import type { MenuOffering } from "@/entities/menu-offering/model/menu-offering"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { Button } from "@/shared/ui/button"

export function MenuItemVisibilityDialog({
  offering,
}: {
  offering: MenuOffering
}) {
  const action = offering.isAvailable ? "Hide from Menu" : "Show in Menu"
  const Icon = offering.isAvailable ? EyeOff : Eye

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11"
          />
        }
        aria-label={`${action}: ${offering.name}`}
        title={action}
      >
        <Icon aria-hidden="true" />
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="size-24 overflow-hidden rounded-2xl">
            <img
              src={offering.imageUrl}
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-contain p-2"
            />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {offering.isAvailable
              ? "Hide this item from the menu?"
              : "Show this item in the menu?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {offering.isAvailable
              ? `${offering.name} will no longer appear in the student menu. You can show it again later.`
              : `${offering.name} will appear in the student menu and become available to order.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" disabled>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
