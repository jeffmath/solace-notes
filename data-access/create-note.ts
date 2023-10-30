import { useDataClient } from "@/data-access/use-data-client";
import dayjs from "dayjs";

export async function createNote(
  userId: number,
  text: string,
): Promise<number> {
  const client = useDataClient();
  await client.connect();

  const result = await client.query(
    'INSERT INTO public."Note" ("userId", "datetime", "text") values ($1, $2, $3)',
    [userId, dayjs().toISOString(), text],
  );
  await client.end();

  return result.rowCount;
}
