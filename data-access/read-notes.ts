import { useDataClient } from "@/data-access/use-data-client";

export async function readNotes(userId: number): Promise<any[]> {
  const client = useDataClient();
  await client.connect();

  const result = await client.query(
    'SELECT * from public."Note" where "userId"=$1 order by "datetime" desc',
    [userId],
  );
  await client.end();

  return result.rows;
}
