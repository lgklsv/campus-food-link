import { createFileRoute } from "@tanstack/react-router"
import { CreateMenuItemPage } from "@/pages/create-menu-item/ui/create-menu-item-page"

export const Route = createFileRoute("/_app/_vendor/vendor/menu/new")({
  component: CreateMenuItemPage,
})
