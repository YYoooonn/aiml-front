"use client";

import { useState } from "react";
import { login, registerUser } from "@/services/auth";
import redirectUser from "@/hook/redirectUser";
import {
  BaseForm,
  PasswordFormBlock,
  SubmitButton,
  TextFormBlock,
} from "@repo/ui/components";
import { navigate } from "../actions/navigate";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("empty username or password");
      return;
    }
    const response = await registerUser({
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      email: email,
    });

    if (!response.success) {
      setError(response.error ? response.error : "unknown error");
      return;
    }

    const res = await login({ username, password });
    if (!res.success) {
      setError(res.error ? res.error : "unknown error");
      res.redirectLink && navigate(res.redirectLink);
      return;
    }

    redirectUser("me");
  };

  return (
    <BaseForm onSubmit={handleSubmit} error={error}>
      <TextFormBlock
        title={"USERNAME"}
        value={username}
        name="username"
        onChange={setUsername}
        placeholder="Enter username"
      />
      <PasswordFormBlock title={"PASSWORD"} onChange={setPassword} />
      <TextFormBlock
        title={"FIRST NAME"}
        value={firstname}
        name="first-name"
        onChange={setFirstName}
        placeholder=""
      />
      <TextFormBlock
        title={"LAST NAME"}
        value={lastname}
        name="last-name"
        onChange={setLastName}
        placeholder=""
      />
      <TextFormBlock
        title={"EMAIL"}
        value={email}
        name="email"
        onChange={setEmail}
        placeholder="Enter email"
      />
      <SubmitButton text={"SUBMIT"} />
    </BaseForm>
  );
}
