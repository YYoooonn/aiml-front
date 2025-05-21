"use client";

import { useEffect, useState } from "react";
import { registerUser } from "@/app/actions/auth";
import redirectUser from "@/hook/redirectUser";
import { useUserInfo } from "@/hook/useUserInfo";
import {
  BaseForm,
  PasswordFormBlock,
  SubmitButton,
  TextFormBlock,
} from "@repo/ui/components";

export default function Register() {
  return <RegisterForm />;
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const resetInfo = useUserInfo((state) => state.reset);

  useEffect(() => {
    resetInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("empty username or password");
    } else {
      const response = await registerUser({
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
        email: email,
      });

      if (response.success) {
        redirectUser("me");
      } else {
        setError(response.error ? response.error : "unknown error");
      }
    }
  };

  return (
    <BaseForm onSubmit={handleSubmit} error={error}>
      <TextFormBlock
        title={"USERNAME"}
        onChange={setUsername}
        placeholder="Enter username"
      />
      <p style={{ marginTop: "12px" }} />
      <PasswordFormBlock title={"PASSWORD"} onChange={setPassword} />
      <p style={{ marginTop: "12px" }} />
      <TextFormBlock
        title={"FIRST NAME"}
        onChange={setFirstName}
        placeholder=""
      />
      <p style={{ marginTop: "12px" }} />
      <TextFormBlock
        title={"LAST NAME"}
        onChange={setLastName}
        placeholder=""
      />
      <p style={{ marginTop: "12px" }} />
      <TextFormBlock
        title={"EMAIL"}
        onChange={setEmail}
        placeholder="Enter email"
      />
      <p style={{ marginTop: "24px" }} />
      <SubmitButton text={"SUBMIT"} />
    </BaseForm>
  );
}
