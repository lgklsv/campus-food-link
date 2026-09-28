import { mockAccount } from "@/entities/account/model/mock-account"
import { Avatar } from "@/shared/ui/avatar"

export function AccountHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {mockAccount.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{mockAccount.role}</p>
      </div>
      <Avatar
        name={mockAccount.name}
        src={mockAccount.avatar}
        className="size-20 border border-border/50 bg-background sm:size-24"
      />
    </header>
  )
}
