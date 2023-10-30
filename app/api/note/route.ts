import { createNote } from "@/data-access/create-note";

export async function POST(request: Request) {
  const formData = await request.json();
  await createNote(+formData.userId, formData.text);
  return Response.json("Note created");
}
