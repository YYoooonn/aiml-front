"use server";

import { NextRequest, NextResponse } from "next/server";
import { generateRandomToken } from "./_utils";

const ROOT = "AUTH";

export async function getAuth(
  request: Request,
  { params }: { params: string[] },
) {
  console.log(`TEST GET ${ROOT} params : `, params);
  const token = request.headers.get("Authorization");
  console.log(`TEST GET ${ROOT} auth : `, token);
  return NextResponse.json(
    { error: `TEST : INVALID GET ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function postAuth(
  request: NextRequest,
  { params }: { params: string[] },
) {
  console.log(`TEST POST ${ROOT} params : `, params);
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log(`TEST POST ${ROOT} body : `, body);
  console.log(`TEST POST ${ROOT} auth : `, token);
  return NextResponse.json(
    { token: generateRandomToken() },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function putAuth(
  request: NextRequest,
  { params }: { params: string[] },
) {
  console.log(`TEST PUT ${ROOT} params : `, params);
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log(`TEST PUT ${ROOT} body : `, body);
  console.log(`TEST PUT ${ROOT} auth : `, token);
  return NextResponse.json(
    { error: `TEST : INVALID PUT ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function deleteAuth(
  request: NextRequest,
  { params }: { params: string[] },
) {
  console.log(`TEST DELETE ${ROOT} params : `, params);
  const token = request.headers.get("Authorization");
  console.log(`TEST DELETE ${ROOT} auth : `, token);
  return NextResponse.json(
    { error: `TEST : INVALID DELETE ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
