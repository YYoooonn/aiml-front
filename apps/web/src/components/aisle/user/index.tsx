"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import * as styles from "./user.css";
import { useState } from "react";
import { BaseNavLayout, AisleButton } from "../base";
// import redirectUser from "@/hook/redirectUser";

export default function User() {
  const { projects } = useUserInfo();
  const [showList, setShowList] = useState(true);

  // // FIXME -  implement on user
  // const handleClick = (e: MouseEvent) => {
  //   e.preventDefault();
  //   redirectUser(username.concat("/edit"));
  // };

  return (
    <BaseNavLayout>
      <AisleButton text={"Project List"}>
        <div
          className={styles.userAisleIcon}
          onClick={() => {
            setShowList(!showList);
          }}
        />
      </AisleButton>
      <div className={styles.projectListContainer}>
        {showList &&
          projects.map((p, i) => {
            return (
              <div key={i} className={styles.projectList}>
                {p.title}
              </div>
            );
          })}
      </div>
    </BaseNavLayout>
  );
}
