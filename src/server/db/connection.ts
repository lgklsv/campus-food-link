import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

// Use DATABASE_URL in local scripts and the Hyperdrive connection string in Workers.
export function createDatabase(connectionString: string) {
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
  })

  return { client, db: drizzle(client) }
}
