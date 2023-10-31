import dayjs from "dayjs";
import { makeQuery } from "@/data-access/make-query";

export async function createNote(
  userId: number,
  text: string,
): Promise<number> {
  const result = await makeQuery(
    'INSERT INTO public."Note" ("userId", "datetime", "text") values ($1, $2, $3)',
    [userId, dayjs().toISOString(), text],
  );
  return result.rowCount;
}
