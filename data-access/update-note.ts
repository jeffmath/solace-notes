import { makeQuery } from "@/data-access/make-query";

export async function updateNote(id: number, text: string): Promise<number> {
  const result = await makeQuery(
    'UPDATE public."Note" set text=$1 where id=$2',
    [text, id],
  );
  return result.rowCount;
}
