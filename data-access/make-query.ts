import { useDataClient } from "@/data-access/use-data-client";
import { QueryResult } from "pg";

export async function makeQuery(
  query: string,
  args: any[],
): Promise<QueryResult> {
  const client = useDataClient();
  await client.connect();

  const result = await client.query(query, args);
  await client.end();

  return result;
}
