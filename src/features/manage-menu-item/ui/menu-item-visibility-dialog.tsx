import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { useState } from "react"
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
import { useMenuItemVisibility } from "../api/use-menu-item-visibility"

export function MenuItemVisibilityDialog({
  offering,
}: {
  offering: MenuOffering
}) {
  const [open, setOpen] = useState(false)
  const mutation = useMenuItemVisibility()
  const action = offering.isAvailable ? "Hide from Menu" : "Show in Menu"
  const Icon = offering.isAvailable ? EyeOff : Eye

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (mutation.isPending) return
        mutation.reset()
        setOpen(nextOpen)
      }}
    >
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
        {mutation.isError ? (
          <p role="alert" className="text-center text-sm text-destructive">
            {mutation.error.message ||
              "Could not update this menu item. Try again."}
          </p>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel type="button" disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={mutation.isPending}
            onClick={() => {
              mutation.mutate(
                { id: offering.id, isAvailable: !offering.isAvailable },
                { onSuccess: () => setOpen(false) }
              )
            }}
          >
            {mutation.isPending ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : null}
            {mutation.isPending ? "Saving" : action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
