import { makeQuery } from "@/data-access/make-query";

export async function createUser(userName: string): Promise<number> {
  const result = await makeQuery(
    'INSERT INTO public."User" ("name") values ($1)',
    [userName],
  );
  return result.rowCount;
}
