import { Client } from "pg";

export function useDataClient(): Client {
  const { env } = process;
  return new Client({
    user: "solace_notes",
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    password: env.POSTGRES_PASSWORD,
    ssl: env.USE_SSL === "true",
  });
}
