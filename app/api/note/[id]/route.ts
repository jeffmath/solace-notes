import { deleteNote } from "@/data-access/delete-note";
import { updateNote } from "@/data-access/update-note";

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } },
) {
  const { text } = await request.json();
  await updateNote(params.id, text);
  return Response.json("Note updated");
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  await deleteNote(params.id);
  return Response.json("Note deleted");
}
