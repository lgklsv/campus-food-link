import { AccountHeader } from "./account-header"
import { AccountHighlights } from "./account-highlights"
import { AccountSettings } from "./account-settings"

export function AccountPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 md:gap-10">
      <AccountHeader />
      <AccountHighlights />
      <AccountSettings />
    </div>
  )
}
