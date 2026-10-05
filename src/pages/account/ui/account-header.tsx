import type { authClient } from "@/entities/account/api/auth-client"
import { getUserAvatar } from "@/entities/account/lib/get-user-avatar"
import { Avatar } from "@/shared/ui/avatar"

export function AccountHeader({
  user,
}: {
  user: typeof authClient.$Infer.Session.user
}) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {user.name}
        </h1>
        <p className="mt-1 text-sm capitalize text-muted-foreground">
          {user.role}
        </p>
      </div>
      <Avatar
        name={user.name}
        src={getUserAvatar(user)}
        className="size-20 border border-border/50 bg-background sm:size-24"
      />
    </header>
  )
}
