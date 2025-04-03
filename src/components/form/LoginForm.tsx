"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { login } from "@/app/_actions/auth";
import { navigate } from "@/app/_actions/navigate";
import { PasswordInput, TextInput, ButtonSubmit } from "@/components/ui";
import * as styles from "./form.css";

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
