import { readUserId } from "@/data-access/read-user-id";

export async function GET(
  request: Request,
  { params }: { params: { userName: string } },
) {
  const userId = await readUserId(params.userName);
  return new Response(userId.toString());
}
