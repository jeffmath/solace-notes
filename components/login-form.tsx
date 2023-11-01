import { Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";

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

  return (
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
  );
}
