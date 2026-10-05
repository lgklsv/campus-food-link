import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { authMiddleware } from "@/server/auth/auth-middleware"

export const getSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const session = await context.auth.api.getSession({
      headers: getRequestHeaders(),
    })
    return session ? { user: session.user } : null
  })
