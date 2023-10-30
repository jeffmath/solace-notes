import { Client } from "pg";

export function useDataClient(): Client {
  return new Client({
    user: "solace_notes",
    host: "localhost",
    database: "solace_notes",
    password: "solace notes",
  });
}
