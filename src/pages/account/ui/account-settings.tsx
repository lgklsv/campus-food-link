import { ChevronRight } from "lucide-react"
import { Separator } from "@/shared/ui/separator"

const settings = ["Account", "Notifications", "Support"] as const

function SettingsRow({ label }: { label: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 px-5 py-3">
      <span className="font-medium">{label}</span>
      <ChevronRight
        aria-hidden="true"
        className="size-5 text-muted-foreground"
      />
    </div>
  )
}

export function AccountSettings() {
  return (
    <section aria-labelledby="account-settings-heading">
      <h2 id="account-settings-heading" className="mb-3 text-xl font-semibold">
        Settings
      </h2>
      <div className="overflow-hidden rounded-3xl bg-card">
        {settings.map((label, index) => (
          <div key={label}>
            <SettingsRow label={label} />
            {index < settings.length - 1 ? (
              <Separator className="ml-5 w-[calc(100%-1.25rem)]" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
