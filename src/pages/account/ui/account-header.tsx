import { Link } from "@tanstack/react-router"
import { authClient } from "@/entities/account/api/auth-client"
import { Avatar } from "@/shared/ui/avatar"

export function AccountHeader() {
  const { data: session, isPending } = authClient.useSession()
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {session?.user.name ?? "Account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isPending ? "Loading…" : (session?.user.role ?? "Guest")}
        </p>
      </div>
      {!session && !isPending && (
        <Link
          to="/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Log in
        </Link>
      )}
      <Avatar
        name={session?.user.name ?? "Account"}
        src={session?.user.image ?? undefined}
        className="size-20 border border-border/50 bg-background sm:size-24"
      />
    </header>
  )
}
