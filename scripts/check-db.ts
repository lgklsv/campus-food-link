import "dotenv/config"
import { sql } from "drizzle-orm"
import { createDatabase } from "../src/server/db/connection"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("Set DATABASE_URL in .env before checking the connection.")
}

const { client, db } = createDatabase(databaseUrl)

try {
  await client.connect()
  const result = await db.execute(sql`SELECT 1 AS connected`)

  if (result.rows[0]?.connected !== 1) {
    throw new Error(
      "The database connection check returned an unexpected result."
    )
  }

  console.info("PostgreSQL connection OK (SELECT 1).")
} finally {
  await client.end()
}
