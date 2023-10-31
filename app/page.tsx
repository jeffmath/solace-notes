"use client";
import "reflect-metadata";
import NotesList from "@/app/notes/notes-list";
import NoteEntry from "@/app/notes/note-entry";
import "bootstrap/dist/css/bootstrap.min.css";
import useSWR from "swr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: notes, mutate } = useSWR("/api/notes/1", (url) =>
    fetch(url).then((res) => res.json()),
  );

  async function handleNoteCreation() {
    toast.success("Note created", {
      autoClose: 1000,
      hideProgressBar: true,
    });
    await mutate();
  }

  async function handleNoteDeletion() {
    toast.success("Note deleted", {
      autoClose: 1000,
      hideProgressBar: true,
    });
    await mutate();
  }

  return (
    <main className="p-24 font-mono">
      <ToastContainer />
      <div className="items-center text-2xl mb-4">Solace Notes</div>
      <NoteEntry userId={1} onNoteCreation={handleNoteCreation} />
      <NotesList notes={notes} onNoteDeletion={handleNoteDeletion} />
    </main>
  );
}
