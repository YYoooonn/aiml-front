import { NextResponse, NextRequest } from "next/server";
import { deleteUsers, getUsers, postUsers, putUsers } from "./_users";
import { deleteObjects, getObjects, postObjects, putObjects } from "./_objects";
import {
  deleteProjects,
  getProjects,
  postProjects,
  putProjects,
} from "./_projects";
import { deleteAuth, getAuth, postAuth, putAuth } from "./_auth";
import { responseHandler } from "@/utils/api";

const handlers: Record<
  string,
  Record<
    string,
    (request: NextRequest, options: { params: string[] }) => Promise<Response>
  >
> = {
  users: { GET: getUsers, POST: postUsers, PUT: putUsers, DELETE: deleteUsers },
  objects: {
    GET: getObjects,
    POST: postObjects,
    PUT: putObjects,
    DELETE: deleteObjects,
  },
  projects: {
    GET: getProjects,
    POST: postProjects,
    PUT: putProjects,
    DELETE: deleteProjects,
  },
  auth: { GET: getAuth, POST: postAuth, PUT: putAuth, DELETE: deleteAuth },
};

async function handleRequest(
  method: string,
  request: NextRequest,
  slug?: string[],
) {
  console.log(`TEST: ${method} REQUEST FOR`, slug);

  if (slug && handlers[slug[0]]) {
    const handler = handlers[slug[0]][method];
    if (handler) {
      const response = await handler(request, { params: slug });
      const data = await responseHandler(response);
      return NextResponse.json(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  return NextResponse.json(
    JSON.stringify({
      result: slug
        ? `INVALID TEST INPUT ${slug}`
        : `TEST REQUEST FOR ${method}`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("GET", request, slug);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("POST", request, slug);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("PUT", request, slug);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("DELETE", request, slug);
}
