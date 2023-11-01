import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { CreateUserAccountForm } from "@/components/create-user-account-form";

export interface LoginFormProps {
  userName: string;
  setUserName: (name: string) => void;
  setUserId: (userId: number) => void;
}

export default function LoginForm({
  userName,
  setUserName,
  setUserId,
}: LoginFormProps) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: userId } = useSWR(
    userName ? `/api/login/${userName}` : null,
    login,
  );

  async function login(url: string) {
    try {
      return await fetch(url, {
        method: "GET",
      }).then((res) => res.json());
    } catch (e: any) {
      console.error("Could not login: " + e.message);
    }
  }

  useEffect(() => {
    if (userId) {
      if (userId <= 0) {
        toast.error("User name not recognized", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else setUserId(userId);
    }
  }, [userId]);

  function handleLoginClick() {
    setUserName(inputRef.current?.value || "");
  }

  function handleCreateClick() {
    setIsCreatingAccount(true);
  }

  return isCreatingAccount ? (
    <CreateUserAccountForm setIsCreatingAccount={setIsCreatingAccount} />
  ) : (
    <>
      <div>
        Please enter your user name:
        <br />
        <input
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.code === "Enter") handleLoginClick();
          }}
        />
        <br />
        <Button variant="primary" className="mt-2" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
      <div className="mt-5">
        Not registered yet?{" "}
        <span className="underline cursor-pointer" onClick={handleCreateClick}>
          Create a new user account
        </span>
      </div>
    </>
  );
}
