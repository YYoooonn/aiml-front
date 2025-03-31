export async function testAction() {
  console.log("ACTION TEST CALLED");
  const response = await fetch("/api/test", {
    method: "GET",
  });
  console.log("ACTION RESPONSE", response);
  const r = await response.json();
  console.log("ACTION RESPONSE JSON", r);
  const parsed = JSON.parse(r);
  console.log("ACTION RESPONSE PARSE", parsed);
  return parsed;
}
