import { makeQuery } from "@/data-access/make-query";

export async function readNotes(userId: number): Promise<any[]> {
  const result = await makeQuery(
    'SELECT * from public."Note" where "userId"=$1 order by "datetime" desc',
    [userId],
  );
  return result.rows;
}
