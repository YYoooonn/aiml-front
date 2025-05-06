"use server";

import { NextRequest, NextResponse } from "next/server";
import { SampleObject } from "@/utils/sample";

const ROOT = "OBJECTS";

export async function getObjects(
  request: Request,
  { params }: { params: string[] },
) {
  const token = request.headers.get("Authorization");
  console.log(`TEST GET ${ROOT} auth : `, token);
  if (params[1]) {
    // projectId
    if (params[2]) {
      //entity
      return NextResponse.json(
        { error: `TEST : INVALID GET ${ROOT} ENTITY REQUEST` },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(
      { ...SampleObject(), ...{ objectId: params[1] } },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(
    { error: `TEST : INVALID GET ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function postObjects(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log(`TEST POST ${ROOT} body : `, body);
  console.log(`TEST POST ${ROOT} auth : `, token);
  if (params[1]) {
    // projectId
    return NextResponse.json(
      { error: `TEST : INVALID POST ${ROOT} REQUEST` },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(
    { ...SampleObject(), ...body },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function putObjects(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log(`TEST PUT ${ROOT} body : `, body);
  console.log(`TEST PUT ${ROOT} auth : `, token);
  if (params[1]) {
    // projectId
    if (params[2]) {
      //entity
      return NextResponse.json(
        { error: `TEST : INVALID PUT ${ROOT} ENTITY REQUEST` },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(
      { ...SampleObject(), ...body },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(
    { error: `TEST : INVALID PUT ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function deleteObjects(
  request: NextRequest,
  { params }: { params: string[] },
) {
  const token = request.headers.get("Authorization");
  console.log(`TEST DELETE ${ROOT} auth : `, token);
  if (params[1]) {
    // userId
    if (params[2]) {
      //entity
      return NextResponse.json(
        { error: `TEST : INVALID DELETE ${ROOT} ENTITY REQUEST` },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json(
      {},
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return NextResponse.json(
    { error: `TEST : INVALID DELETE ${ROOT} REQUEST` },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
