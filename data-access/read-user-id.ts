import { makeQuery } from "@/data-access/make-query";

export async function readUserId(userName: string): Promise<number> {
  const result = await makeQuery(
    'SELECT id from public."User" where "name"=$1',
    [userName],
  );
  return result.rows[0]?.id || -1;
}
