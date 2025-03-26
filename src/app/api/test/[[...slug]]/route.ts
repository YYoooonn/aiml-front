import { NextResponse, NextRequest } from "next/server";
import { deleteUsers, getUsers, postUsers, putUsers } from "./_users";
import { deleteObjects, getObjects, postObjects, putObjects } from "./_objects";
import { deleteProjects, getProjects, postProjects, putProjects } from "./_projects";
import { deleteAuth, getAuth, postAuth, putAuth } from "./_auth";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ slug?: string[] }>}){
  const {slug} = await params
  console.log("TEST: GET REQUEST ON - ", slug)

  if(slug){
    // users
    if(slug[0] === "users"){
      return getUsers(request, {params : slug})
    }
    //objects
    else if (slug[0] === "objects"){
      return getObjects(request, {params : slug})
    } 
    // projects
    else if (slug[0] === "projects"){
      return getProjects(request, {params : slug})
    } 
    // auth
    else if (slug[0] === "auth") {
      return getAuth(request, {params : slug})
    } 
    // else if (slug[0] === "auth") {}
  } else {
    return NextResponse.json(JSON.stringify({result : "TEST REQUEST FOR GET"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}


// login
export async function POST(request: NextRequest,{ params }: { params: Promise<{ slug?: string[] }>}) {
  const {slug} = await params
  console.log("TEST: POST REQUEST FOR ", slug)
  if(slug){
    // users
    if(slug[0] === "users"){
      return postUsers(request, {params : slug})
    }
    //objects
    else if (slug[0] === "objects"){
      return postObjects(request, {params : slug})
    } 
    // projects
    else if (slug[0] === "projects"){
      return postProjects(request, {params : slug})
    } 
    // auth
    else if (slug[0] === "auth") {
      return postAuth(request, {params : slug})
    } 
    // else if (slug[0] === "auth") {}
  }
  return NextResponse.json(JSON.stringify({result : "TEST REQUEST FOR POST"}), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })

}

export async function PUT(request: NextRequest,{ params }: { params: Promise<{ slug?: string[] }>}){
  const {slug} = await params
  console.log("TEST: PUT REQUEST FOR ", slug)
  if(slug){
    // users
    if(slug[0] === "users"){
      return putUsers(request, {params : slug})
    }
    //objects
    else if (slug[0] === "objects"){
      return putObjects(request, {params : slug})
    } 
    // projects
    else if (slug[0] === "projects"){
      return putProjects(request, {params : slug})
    } 
    // auth
    else if (slug[0] === "auth") {
      return putAuth(request, {params : slug})
    } 
    // else if (slug[0] === "auth") {}

  }

  return NextResponse.json(JSON.stringify({result : "TEST REQUEST FOR POST"}), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ slug?: string[] }>}){
  const {slug} = await params
  console.log("TEST: PUT REQUEST FOR ", slug)
  if(slug){
    // users
    if(slug[0] === "users"){
      return deleteUsers(request, {params : slug})
    }
    //objects
    else if (slug[0] === "objects"){
      return deleteObjects(request, {params : slug})
    } 
    // projects
    else if (slug[0] === "projects"){
      return deleteProjects(request, {params : slug})
    } 
    // auth
    else if (slug[0] === "auth") {
      return deleteAuth(request, {params : slug})
    } 
    // else if (slug[0] === "auth") {}

  }

  return NextResponse.json(JSON.stringify({result : "TEST REQUEST FOR POST"}), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}