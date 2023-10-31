import { makeQuery } from "@/data-access/make-query";

export async function deleteNote(id: number): Promise<number> {
  const result = await makeQuery('DELETE FROM public."Note" where id=$1', [id]);
  return result.rowCount;
}
