"use client";

import { useState } from "react";
import { login } from "@/app/_actions/auth";
import { navigate } from "@/app/_actions/navigate";
import {
  SubmitButton,
  BaseButton,
  BaseForm,
  TextFormBlock,
  PasswordFormBlock,
} from "@repo/ui/components";
import { DefaultLayout } from "@repo/ui/layout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <DefaultLayout header={<Header />} footer={<Footer />}>
      <LoginForm />
    </DefaultLayout>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // // remove error message detecting change
  // useEffect(() => {
  //   if (error && username && password) {
  //     setError("");
  //   }
  // }, [username, password, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("empty username or password");
    } else {
      const loginData = { username: username, password: password };
      const data = await login(loginData);
      if (data.success) {
        await navigate("/user/me");
      } else {
        if (data.error) {
          setError(data.error);
        } else {
          alert("unknown error please try again");
        }
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
      <PasswordFormBlock
        title={"PASSWORD"}
        onChange={setPassword}
        placeholder="Enter password"
      />
      <p style={{ marginTop: "24px" }} />
      <SubmitButton text={"SUBMIT"} style={{ height: "32px" }} />
      <p style={{ marginTop: "24px" }} />
      <BaseButton
        text={"SIGN UP"}
        handler={() => navigate("/register")}
        style={{ height: "32px" }}
      />
    </BaseForm>
  );
}
