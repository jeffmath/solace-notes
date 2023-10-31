import { deleteNote } from "@/data-access/delete-note";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  await deleteNote(params.id);
  return Response.json("Note deleted");
}
