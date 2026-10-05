import { createMiddleware } from "@tanstack/react-start"
import {
  getRequestHeaders,
  setResponseStatus,
} from "@tanstack/react-start/server"
import { authMiddleware } from "./auth-middleware"

export const requireSessionMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ context, next }) => {
    const session = await context.auth.api.getSession({
      headers: getRequestHeaders(),
    })

    if (!session) {
      setResponseStatus(401)
      throw new Error("Authentication required.")
    }

    return next({ context: { user: session.user } })
  })
