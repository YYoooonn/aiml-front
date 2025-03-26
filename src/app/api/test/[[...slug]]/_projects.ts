"use server"

import { NextRequest, NextResponse } from "next/server";
import { generateRandomObjects, generateRandomProject, generateRandomProjects, TProject } from "./_utils";

const ROOT = "PROJECT"

export async function getProjects(request: Request,{ params }: { params: string[]}){
    const token = request.headers.get("Authorization")
    console.log(`TEST GET ${ROOT} auth : `, token)
    if(params[1]){
        // projectId
        if(params[2]){
            //entity
            if(params[2] === "objects"){
                return NextResponse.json(JSON.stringify({objects : generateRandomObjects(40)}), {
                    status: 200,
                    headers: {"Content-Type": "application/json"}})
            }
            const entity = params[2] as keyof TProject
            return NextResponse.json(JSON.stringify({[entity] : generateRandomProject()[entity]}), {
                status: 200,
                headers: {"Content-Type": "application/json"}})
            }
        if(params[1] === "search"){
            return NextResponse.json(JSON.stringify({content : generateRandomProjects(100)}), {
                status: 200,
                headers: {"Content-Type": "application/json"}})
        }
        return NextResponse.json(JSON.stringify({...generateRandomProject(), ...{projectId: params[1]}}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID GET ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function postProjects(request: NextRequest,{ params }: { params: string[]}){
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
    return NextResponse.json(JSON.stringify({...generateRandomProject(), ...body}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function putProjects(request: NextRequest,{ params }: { params: string[]}){
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
        return NextResponse.json(JSON.stringify({...generateRandomProject(), ...body}), {
            status: 200,
            headers: {"Content-Type": "application/json"}})
    }
    return NextResponse.json(JSON.stringify({error : `TEST : INVALID PUT ${ROOT} REQUEST`}), {
        status: 200,
        headers: {"Content-Type": "application/json"}})
}

export async function deleteProjects(request: NextRequest,{ params }: { params: string[]}){
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