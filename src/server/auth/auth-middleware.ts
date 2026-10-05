import { env } from "cloudflare:workers"
import { createMiddleware } from "@tanstack/react-start"
import { createDatabase } from "../db/connection"
import { createAuth } from "./auth"

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { client, db } = createDatabase(env.HYPERDRIVE.connectionString)

  try {
    await client.connect()
    const auth = createAuth(db, env)
    return await next({ context: { db, auth } })
  } finally {
    await client.end()
  }
})
