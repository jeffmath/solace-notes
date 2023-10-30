"use client";
import dayjs from "dayjs";
import { Note } from "@/model/note";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="items-center">
      {notes?.map(({ id, datetime, text }) => (
        <div className="mb-3" key={id}>
          <span className="italic">
            {dayjs(datetime).format("MMM D, YYYY h:mm A")}
          </span>
          <br />
          {text}
        </div>
      ))}
    </div>
  );
}
