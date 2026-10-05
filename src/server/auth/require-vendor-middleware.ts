import { createMiddleware } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import { requireSessionMiddleware } from "./require-session-middleware"

export const requireVendorMiddleware = createMiddleware({ type: "function" })
  .middleware([requireSessionMiddleware])
  .server(({ context, next }) => {
    if (context.user.role !== "vendor") {
      setResponseStatus(403)
      throw new Error("Vendor access required.")
    }

    return next()
  })
