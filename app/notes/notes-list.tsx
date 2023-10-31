import dayjs from "dayjs";
import { Note } from "@/models/note";
import { BsPencil, BsTrash } from "react-icons/bs";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import NoteEditor from "@/app/notes/note-editor";

interface NotesListProps {
  notes: Note[];
  searchFilter?: string;
  onNoteUpdate: () => void;
  onNoteDeletion: () => void;
}

export default function NotesList({
  notes,
  searchFilter,
  onNoteUpdate,
  onNoteDeletion,
}: NotesListProps) {
  const { trigger } = useSWRMutation("/api/note", deleteNote);
  const [editId, setEditId] = useState<number | undefined>(undefined);

  function handleUpdate() {
    setEditId(undefined);
    onNoteUpdate();
  }

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

  const filteredNotes = searchFilter
    ? notes.filter((note) => note.text.indexOf(searchFilter) >= 0)
    : notes;
  return (
    <div className="items-center">
      {filteredNotes?.map(({ id, datetime, text }) => (
        <div className="mb-3" key={id}>
          <span className="italic">
            {dayjs(datetime).format("MMM D, YYYY h:mm A")}
          </span>
          {!editId && (
            <>
              <button
                type="button"
                className="ml-3 relative top-0.5"
                onClick={() => setEditId(id)}
              >
                <BsPencil />
              </button>
              <button
                type="button"
                className="ml-3 relative top-0.5"
                onClick={() => trigger(id)}
              >
                <BsTrash />
              </button>
            </>
          )}
          <br />
          {id !== editId ? (
            text
          ) : (
            <NoteEditor
              id={id}
              text={text}
              onUpdate={() => handleUpdate()}
              onCancel={() => setEditId(undefined)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
