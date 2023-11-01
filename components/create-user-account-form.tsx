import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

export interface CreateUserAccountFormProps {
  setIsCreatingAccount: (value: boolean) => void;
}

export function CreateUserAccountForm({
  setIsCreatingAccount,
}: CreateUserAccountFormProps) {
  const [userName, setUserName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: userId } = useSWR(
    userName ? `/api/login/${userName}` : null,
    checkForExistingUser,
  );

  async function checkForExistingUser(url: string) {
    try {
      return await fetch(url, {
        method: "GET",
      }).then((res) => res.json());
    } catch (e: any) {
      console.error("Could not check for an existing user: " + e.message);
    }
  }

  useEffect(() => {
    if (userId) {
      if (userId >= 0) {
        toast.error("That user name is already taken", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        // the name isn't taken, so create the user account
        void trigger();
      }
    }
  }, [userId]);

  const { trigger } = useSWRMutation("/api/account", createAccount);

  async function createAccount(url: string) {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userName }),
      });
      toast.success("Account created", {
        autoClose: 3000,
        hideProgressBar: true,
      });
      setIsCreatingAccount(false);
    } catch (e: any) {
      console.error("Could not create account: " + e.message);
    }
  }

  function handleCreateClick() {
    setUserName(inputRef.current?.value || "");
  }

  return (
    <div>
      Please enter the user name you would like to use:
      <br />
      <input
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.code === "Enter") handleCreateClick();
        }}
      />
      <br />
      <Button variant="primary" className="mt-2" onClick={handleCreateClick}>
        Create account
      </Button>
      <Button
        variant="secondary"
        className="mt-2 ml-3"
        onClick={() => setIsCreatingAccount(false)}
      >
        Cancel
      </Button>
    </div>
  );
}
