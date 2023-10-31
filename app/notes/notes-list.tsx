import dayjs from "dayjs";
import { Note } from "@/models/note";
import { BsTrash } from "react-icons/bs";
import useSWRMutation from "swr/mutation";

interface NotesListProps {
  notes: Note[];
  onNoteDeletion: () => void;
}

export default function NotesList({ notes, onNoteDeletion }: NotesListProps) {
  const { trigger } = useSWRMutation("/api/note", deleteNote);

  async function deleteNote(url: string, { arg }: { arg: number }) {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await fetch(`${url}/${arg}`, {
          method: "DELETE",
        });
        onNoteDeletion();
      } catch (e: any) {
        console.error("Could not delete note: " + e.message);
      }
    }
  }

  return (
    <div className="items-center">
      {notes?.map(({ id, datetime, text }) => (
        <div className="mb-3" key={id}>
          <span className="italic">
            {dayjs(datetime).format("MMM D, YYYY h:mm A")}
          </span>
          <button
            type="button"
            className="ml-3 relative top-0.5"
            onClick={() => trigger(id)}
          >
            <BsTrash />
          </button>
          <br />
          {text}
        </div>
      ))}
    </div>
  );
}
