import { useNavigate, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { authClient } from "@/entities/account/api/auth-client"
import { Button } from "@/shared/ui/button"

export function AccountLogout() {
  const navigate = useNavigate()
  const router = useRouter()
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
      await router.invalidate()
      await navigate({ to: "/login", replace: true })
    } catch {
      setError("Unable to connect. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div>
      <Button
        type="button"
        onClick={signOut}
        disabled={isSigningOut}
        variant="secondary"
        size="lg"
        className="w-full rounded-3xl bg-card text-base text-destructive"
      >
        {isSigningOut ? "Logging out…" : "Log out"}
      </Button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
