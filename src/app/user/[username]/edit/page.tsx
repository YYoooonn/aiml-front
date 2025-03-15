"use client";

import Form from "@/components/form/BaseForm";
import redirectUser from "@/hook/redirectUser";
import { useUserInfo } from "@/hook/useUserInfo";
import { useState } from "react";
import * as styles from "./edit.css";

export default function Page() {
  const userState = useUserInfo((state) => state);
  const updateUser = useUserInfo((state) => state.update);
  const [firstName, setFirstname] = useState(userState.firstName);
  const [lastName, setLastname] = useState(userState.lastName);
  const [email, setEmail] = useState(userState.email);

  const formProps = {
    props: [
      {
        form: { label: "first name", type: "text", value: firstName },
        dispatcher: setFirstname,
      },
      {
        form: { label: "last name", type: "text", value: lastName },
        dispatcher: setLastname,
      },
      {
        form: { label: "email", type: "text", value: email },
        dispatcher: setEmail,
      },
    ],
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      await updateUser({ userInfos: updateInfo });
      console.debug("submission complete");
      redirectUser(userState.username);
    } catch (err) {
      console.debug(err);
    }
  };
  return (
    <div className={styles.userEditContainer}>
      <div>edit page</div>
      <Form propsWithDispatch={formProps} handleSubmit={handleSubmit} />
    </div>
  );
}
