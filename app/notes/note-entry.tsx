import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../globals.css";
import useSWRMutation from "swr/mutation";

interface NoteEntryProps {
  userId: number;
  onNoteCreation: () => void;
}
export default function NoteEntry({ userId, onNoteCreation }: NoteEntryProps) {
  const [text, setText] = useState("");
  const { trigger } = useSWRMutation("/api/note", createNote);

  async function createNote(url: string) {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId, text }),
      });
      onNoteCreation();
      setText("");
    } catch (e: any) {
      console.error("Could not create note: " + e.message);
    }
  }

  return (
    <Form className="mb-3">
      <Form.Control
        className="!w-2/5"
        as="textarea"
        minLength={20}
        maxLength={300}
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></Form.Control>
      <Button
        variant="primary"
        className="mt-2"
        disabled={text.length < 20 || text.length > 300}
        onClick={() => trigger()}
      >
        Create
      </Button>
    </Form>
  );
}
