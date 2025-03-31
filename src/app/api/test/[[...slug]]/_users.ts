"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  generateRandomProjects,
  generateRandomToken,
  generateRandomUser,
} from "./_utils";

export async function getUsers(
  request: Request,
  { params }: { params: string[] },
) {
  const token = request.headers.get("Authorization");
  console.log("TEST GET USER auth : ", token);
  if (params[1]) {
    // userId
    if (params[2]) {
      //entity
      if (params[2] === "projects") {
        return NextResponse.json(
          JSON.stringify({ projects: generateRandomProjects(10) }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return NextResponse.json(
        JSON.stringify({ error: "TEST : INVALID GET USER ENTITY REQUEST" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(JSON.stringify({ ...generateRandomUser() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return NextResponse.json(
    JSON.stringify({ error: "TEST : INVALID GET USER REQUEST" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function postUsers(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log("TEST POST USER body : ", body);
  console.log("TEST POST USER auth : ", token);
  if (params[1]) {
    // userId
    if (params[2]) {
      //entity
      return NextResponse.json(
        JSON.stringify({ error: "TEST : INVALID POST USER ENTITY REQUEST" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(
      JSON.stringify({ error: "TEST : INVALID POST USER REQUEST" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(JSON.stringify({ token: generateRandomToken() }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function putUsers(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log("TEST PUT USER body : ", body);
  console.log("TEST PUT USER auth : ", token);
  if (params[1]) {
    // userId
    if (params[2]) {
      //entity
      return NextResponse.json(
        JSON.stringify({ error: "TEST : INVALID PUT USER ENTITY REQUEST" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(
      JSON.stringify({ ...generateRandomUser(), ...body }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(
    JSON.stringify({ error: "TEST : INVALID PUT USER REQUEST" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function deleteUsers(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const token = request.headers.get("Authorization");
  console.log("TEST DELETE USER auth : ", token);
  if (params[1]) {
    // userId
    if (params[2]) {
      //entity
      return NextResponse.json(
        JSON.stringify({ error: "TEST : INVALID DELETE USER ENTITY REQUEST" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return NextResponse.json(
    JSON.stringify({ error: "TEST : INVALID DELETE USER REQUEST" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
