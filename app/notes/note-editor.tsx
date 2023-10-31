import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../globals.css";
import useSWRMutation from "swr/mutation";

interface NoteEditorProps {
  id: number;
  text: string;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function NoteEditor({
  id,
  text,
  onUpdate,
  onCancel,
}: NoteEditorProps) {
  const [editedText, setEditedText] = useState(text);
  const { trigger } = useSWRMutation("/api/note", updateNote);

  async function updateNote(url: string) {
    try {
      await fetch(`${url}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ text: editedText }),
      });
      onUpdate();
    } catch (e: any) {
      console.error("Could not update note: " + e.message);
    }
  }

  return (
    <Form className="mb-3">
      <Form.Control
        className="!w-2/5"
        as="textarea"
        minLength={20}
        maxLength={300}
        value={editedText}
        onChange={(event) => setEditedText(event.target.value)}
      ></Form.Control>
      <Button variant="primary" className="mt-2" onClick={() => trigger()}>
        Update
      </Button>
      <Button
        variant="secondary"
        className="mt-2 ml-3"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Form>
  );
}
