"use server"

import { NextRequest, NextResponse } from "next/server";
import { generateRandomToken } from "./_utils";

const ROOT = "AUTH"

export async function getAuth(request: Request,{ params }: { params: string[]}){
    const token = request.headers.get("Authorization")
    console.log(`TEST GET ${ROOT} auth : `, token)
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID GET ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function postAuth(request: NextRequest,{ params }: { params: string[]}){
    const body = await request.json()
    const token = request.headers.get("Authorization")
    console.log(`TEST POST ${ROOT} body : `, body)
    console.log(`TEST POST ${ROOT} auth : `, token)
    return NextResponse.json(JSON.stringify({token: generateRandomToken()}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function putAuth(request: NextRequest,{ params }: { params: string[]}){
    const body = await request.json()
    const token = request.headers.get("Authorization")
    console.log(`TEST PUT ${ROOT} body : `, body)
    console.log(`TEST PUT ${ROOT} auth : `, token)
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID PUT ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function deleteAuth(request: NextRequest,{ params }: { params: string[]}){
    const token = request.headers.get("Authorization")
    console.log(`TEST DELETE ${ROOT} auth : `, token)
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID DELETE ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}