"use client";
import "reflect-metadata";
import NotesList from "@/components/notes-list";
import NoteEntry from "@/components/note-entry";
import "bootstrap/dist/css/bootstrap.min.css";
import useSWR from "swr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import LoginForm from "@/components/login-form";

export default function Home() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    undefined,
  );

  const {
    data: notes,
    isLoading,
    mutate,
  } = useSWR(userId ? `/api/notes/${userId}` : null, (url) =>
    fetch(url).then((res) => res.json()),
  );

  async function handleNoteCreation() {
    await mutate();
    toast.success("Note created", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

  async function handleNoteUpdate() {
    await mutate();
    toast.success("Note updated", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

  async function handleNoteDeletion() {
    await mutate();
    toast.success("Note deleted", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

  return (
    <main className="px-24 py-8 font-mono">
      <ToastContainer />
      <div className="items-center text-2xl mb-4">
        Solace Notes
        {userId && (
          <span className="text-base">
            <input
              className="ml-8 inline"
              onChange={(event) => setSearchFilter(event.target.value)}
            />
            <BsSearch className="ml-2 inline" />
          </span>
        )}
      </div>
      {userId ? (
        <>
          <NoteEntry userId={1} onNoteCreation={handleNoteCreation} />
          {isLoading ? (
            "Loading..."
          ) : (
            <NotesList
              notes={notes}
              searchFilter={searchFilter}
              onNoteUpdate={handleNoteUpdate}
              onNoteDeletion={handleNoteDeletion}
            />
          )}
        </>
      ) : (
        <LoginForm setUserId={setUserId} />
      )}
    </main>
  );
}
