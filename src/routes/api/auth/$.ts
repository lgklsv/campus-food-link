import { createFileRoute } from "@tanstack/react-router"
import { authMiddleware } from "@/server/auth/auth-middleware"

export const Route = createFileRoute("/api/auth/$")({
  server: {
    middleware: [authMiddleware],
    handlers: {
      GET: ({ request, context }) => context.auth.handler(request),
      POST: ({ request, context }) => context.auth.handler(request),
    },
  },
})
