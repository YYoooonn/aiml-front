"use server"

import { NextRequest, NextResponse } from "next/server";
import { generateRandomObject } from "./_utils";

const TEST = {
    objectId: 1,
    createdAt: "2025-03-17T09:49:16.332093",
    lastModifiedAt: "2025-03-17T09:49:06.985782",
    matrix: [1, 0, 0, 0, 0, 4, 0,0,0, 0, 1, 0,0, -1, 0.5, 1],
    geometry: "ConeGeometry",
    material: "#575757"
} as any

const ROOT = "OBJECTS"

export async function getObjects(request: Request,{ params }: { params: string[]}){
    const token = request.headers.get("Authorization")
    console.log(`TEST GET ${ROOT} auth : `, token)
    if(params[1]){
        // projectId
        if(params[2]){
            //entity
            return NextResponse.json(JSON.stringify({error : `TEST : INVALID GET ${ROOT} ENTITY REQUEST`}), {
                status: 200,
                headers: {"Content-Type": "application/json"}})
            }
        return NextResponse.json(JSON.stringify({...generateRandomObject(), ...{objectId: params[1]}}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID GET ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function postObjects(request: NextRequest,{ params }: { params: string[]}){
    const body = await request.json()
    const token = request.headers.get("Authorization")
    console.log(`TEST POST ${ROOT} body : `, body)
    console.log(`TEST POST ${ROOT} auth : `, token)
    if(params[1]){
        // projectId
        // if(params[2]){
        //     //entity
        //     return NextResponse.json(JSON.stringify({error : `TEST : INVALID POST ${ROOT} ENTITY REQUEST`}), {
        //         status: 200,
        //         headers: {"Content-Type": "application/json"}})
        //     }
        return NextResponse.json(JSON.stringify({error : `TEST : INVALID POST ${ROOT} REQUEST`}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({...generateRandomObject(), ...body}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function putObjects(request: NextRequest,{ params }: { params: string[]}){
    const body = await request.json()
    const token = request.headers.get("Authorization")
    console.log(`TEST PUT ${ROOT} body : `, body)
    console.log(`TEST PUT ${ROOT} auth : `, token)
    if(params[1]){
        // projectId
        if(params[2]){
            //entity
            return NextResponse.json(JSON.stringify({error : `TEST : INVALID PUT ${ROOT} ENTITY REQUEST`}), {
                status: 200,
                headers: {"Content-Type": "application/json"}})
            }
        return NextResponse.json(JSON.stringify({...generateRandomObject(), ...body}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID PUT ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function deleteObjects(request: NextRequest,{ params }: { params: string[]}){
    const token = request.headers.get("Authorization")
    console.log(`TEST DELETE ${ROOT} auth : `, token)
    if(params[1]){
        // userId
        if(params[2]){
            //entity
            return NextResponse.json(JSON.stringify({error : `TEST : INVALID DELETE ${ROOT} ENTITY REQUEST`}), {
                status: 200,
                headers: {"Content-Type": "application/json"}})
            }
        return NextResponse.json(JSON.stringify({}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID DELETE ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}