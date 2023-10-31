import { createNote } from "@/data-access/create-note";

export async function POST(request: Request) {
  const { userId, text } = await request.json();
  await createNote(userId, text);
  return Response.json("Note created");
}
