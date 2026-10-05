import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { betterAuth } from "better-auth"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import * as schema from "../db/schema"

export function createAuth(
  db: NodePgDatabase,
  settings: { BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string }
) {
  return betterAuth({
    secret: settings.BETTER_AUTH_SECRET,
    baseURL: settings.BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: "pg", schema }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    user: {
      additionalFields: {
        role: {
          type: ["student", "vendor", "admin"],
          required: true,
          defaultValue: "student",
          input: false,
        },
      },
    },
  })
}

export type Auth = ReturnType<typeof createAuth>
