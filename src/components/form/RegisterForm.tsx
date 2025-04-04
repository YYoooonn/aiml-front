"use client";

import { useEffect, useState } from "react";
import { create } from "@/app/_actions/user";
import redirectUser from "@/hook/redirectUser";
import { useUserInfo } from "@/hook/useUserInfo";
import { PasswordInput, TextInput, ButtonSubmit } from "@/components/ui";
import * as styles from "./form.css";

export default function RegisterForm() {
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

    const response = await create({
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      email: email,
    });

    if (response.success) {
      redirectUser("me");
    } else {
      setError(response.error);
    }

    // await create({
    //   username: username,
    //   password: password,
    //   firstName: firstname,
    //   lastName: lastname,
    //   email: email,
    // })
    //   .then((res) =>
    //     res.error
    //       ? alert(res.error)
    //       : login({
    //           username: username,
    //           password: password,
    //         }),
    //   )
    //   .then((res) =>
    //     {
    //       if(res){
    //         if(res.error) {alert(res.error)} else{
    //         redirectUser(res.username)
    //       }
    //     }}
    //   )
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <div className={styles.baseFormContainer}>
      <TextInput title={"USERNAME"} dispatch={setUsername} />
      <p style={{ marginTop: "24px" }} />
      <PasswordInput title={"PASSWORD"} dispatch={setPassword} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"FIRST NAME"} dispatch={setFirstName} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"LAST NAME"} dispatch={setLastName} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"EMAIL"} dispatch={setEmail} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SUBMIT"} handler={handleSubmit} />
      {error ? (
        <>
          <p style={{ marginTop: "12px" }} />
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
