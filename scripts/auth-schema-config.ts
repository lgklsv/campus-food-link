import "dotenv/config"
import { createAuth } from "../src/server/auth/auth"
import { createDatabase } from "../src/server/db/connection"

const { DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL } = process.env

if (!DATABASE_URL || !BETTER_AUTH_SECRET || !BETTER_AUTH_URL) {
  throw new Error(
    "Set DATABASE_URL, BETTER_AUTH_SECRET and BETTER_AUTH_URL in .env."
  )
}

// The schema generator inspects configuration; it does not open a connection.
const { db } = createDatabase(DATABASE_URL)
export const auth = createAuth(db, { BETTER_AUTH_SECRET, BETTER_AUTH_URL })
