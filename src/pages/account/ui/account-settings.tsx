import { useNavigate } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { authClient } from "@/entities/account/api/auth-client"
import { Button } from "@/shared/ui/button"
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
  const navigate = useNavigate()
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signOut() {
    setIsSigningOut(true)
    setError(null)
    try {
      const result = await authClient.signOut()
      if (result.error) {
        setError(result.error.message || "Unable to log out. Please try again.")
        return
      }
      await navigate({ to: "/login" })
    } catch {
      setError("Unable to connect. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

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
      <Button
        type="button"
        onClick={signOut}
        disabled={!session || isPending || isSigningOut}
        variant="secondary"
        size="lg"
        className="mt-4 w-full rounded-3xl bg-card text-base text-destructive"
      >
        {isSigningOut ? "Logging out…" : "Log out"}
      </Button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  )
}
