"use client";

import { testAction } from "../_actions/test";

export default function Test() {
  const handleClick = async () => {
    const result = await testAction({
      username: "aimlprjt",
      password: ["aimlprjt"],
    });
    console.log(result);
  };

  return (
    <div onClick={handleClick} style={{ color: "white" }}>
      BUTTON TEST
    </div>
  );
}
