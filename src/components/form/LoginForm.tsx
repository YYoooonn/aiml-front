"use client";

import { useEffect, useState } from "react";
import { PasswordInput, TextInput } from "../ui/input";
import { ButtonSubmit } from "../ui/button";

import * as styles from "./form.css";
import { navigate } from "@/app/_actions/navigate";
import { login } from "@/app/_actions/auth";
import { redirect } from "next/navigation";

export default function LoginForm() {
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
      if (data.error) {
        setError(data.error);
      } else {
        await navigate("/user/me");
      }
    }
  };

  return (
    <form className={styles.baseFormContainer}>
      <TextInput title={"USERNAME"} dispatch={setUsername} />
      <p style={{ marginTop: "24px" }} />
      <PasswordInput title={"PASSWORD"} dispatch={setPassword} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SUBMIT"} handler={handleSubmit} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SIGN UP"} handler={() => redirect("/register")} />
      {error ? (
        <>
          <p style={{ marginTop: "12px" }} />
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}
