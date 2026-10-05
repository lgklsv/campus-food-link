import type { ReactNode } from "react"
import type { authClient } from "@/entities/account/api/auth-client"
import { AccountHeader } from "./account-header"
import { AccountLogout } from "./account-logout"

export function AccountPage({
  user,
  children,
}: {
  user: typeof authClient.$Infer.Session.user
  children: ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 md:gap-10">
      <AccountHeader user={user} />
      {children}
      <AccountLogout />
    </div>
  )
}
