import { readNotes } from "@/data-access/read-notes";

export async function GET(
  request: Request,
  { params }: { params: { userId: number } },
) {
  const notes = await readNotes(params.userId);

  return Response.json(notes);
}
