import { createFileRoute } from "@tanstack/react-router"
import { AccountHighlights } from "@/pages/account/ui/account-highlights"
import { AccountSettings } from "@/pages/account/ui/account-settings"

export const Route = createFileRoute("/_app/_tabs/account/")({
  component: AccountContent,
})

function AccountContent() {
  const { user } = Route.useRouteContext()
  if (user.role !== "student") return null
  return (
    <>
      <AccountHighlights />
      <AccountSettings />
    </>
  )
}
