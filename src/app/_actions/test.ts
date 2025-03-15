import { NextResponse } from "next/server";

export async function testAction(props: any) {
  console.log("ACTION TEST PROPS", props);
  const response = await fetch("/api/test", {
    method: "POST",
    body: JSON.stringify(props),
  });
  console.log("ACTION RESPONSE", response);
  const r = await response.json();
  console.log("ACTION RESPONSE JSON", r);
  const parsed = JSON.parse(r);
  console.log("ACTION RESPONSE PARSE", parsed);
  return parsed;
  console.log("ACTION RESPONSE TO JSON", r);
  const st = JSON.stringify(r);
  console.log("ACTION RESPONSE TO STR", st);

  return NextResponse.json(st, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
