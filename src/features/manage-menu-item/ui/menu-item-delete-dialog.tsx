import { LoaderCircle, Trash2 } from "lucide-react"
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
import { useDeleteMenuItem } from "../api/use-delete-menu-item"

export function MenuItemDeleteDialog({ offering }: { offering: MenuOffering }) {
  const [open, setOpen] = useState(false)
  const mutation = useDeleteMenuItem()

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
            className="size-11 text-destructive hover:text-destructive active:text-destructive"
          />
        }
        aria-label={`Delete ${offering.name}`}
        title="Delete"
      >
        <Trash2 aria-hidden="true" />
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
          <AlertDialogTitle>Delete this menu item?</AlertDialogTitle>
          <AlertDialogDescription>
            {offering.name} will be removed from your menu and the student menu.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {mutation.isError ? (
          <p role="alert" className="text-center text-sm text-destructive">
            {mutation.error.message ||
              "Could not delete this menu item. Try again."}
          </p>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel type="button" disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate(offering.id, { onSuccess: () => setOpen(false) })
            }
          >
            {mutation.isPending ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : null}
            {mutation.isPending ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
