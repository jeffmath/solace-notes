import { createUser } from "@/data-access/create-user";

export async function POST(request: Request) {
  const { userName } = await request.json();
  await createUser(userName);
  return Response.json("Account created");
}
