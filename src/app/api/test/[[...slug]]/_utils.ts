
export interface TUser {
    userId: number
    username: string
    firstName?: string
    lastName?: string
    createdAt: string
    lastModifiedAt: string
    email?: string
}

export interface TProject {
    projectId: number
    title: string
    subtitle: string
    createdAt: string
    lastModifiedAt: string
}

export interface TObject {
    objectId: number
    createdAt: string
    lastModifiedAt: string
    matrix: number[]
    geometry: string
    material: string
}

export function generateRandomUser(id?:number): TUser {
    return {
        userId: id? id: 1,
        username: generateRandomString(),
        firstName: generateRandomString(),
        lastName: generateRandomString(),
        createdAt: "2025-03-17T09:49:16.332093",
        lastModifiedAt: "2025-03-17T09:49:06.985782",
        email: generateRandomString().concat("@gmail.com")
    }
}

export function generateRandomUsers(count: number){
    return Array.from({length: count}).map((_, i) => generateRandomUser(i+1))

}

export function generateRandomProject(id?: number) : TProject {
    return {
        projectId: id? id:1,
        title: generateRandomString(),
        subtitle: generateRandomString(),
        createdAt: "2025-03-17T09:49:16.332093",
        lastModifiedAt: "2025-03-17T09:49:06.985782",
    }
}

export function generateRandomProjects(count : number){
    return Array.from({length: count}).map((_, i) => generateRandomProject(i+1))

}

export function generateRandomObject(id?: number) : TObject{
    return {
        objectId: id? id: 1,
        createdAt: "2025-03-17T09:49:16.332093",
        lastModifiedAt: "2025-03-17T09:49:06.985782",
        matrix: generateRandomMatrix(),
        geometry: generateRandomGeometry(),
        material: generateRandomHexcolor()
    }
}

export function generateRandomToken(){
    return generateRandomString()
}

export function generateRandomObjects(count: number){
    return Array.from({length: count}).map((_, i) => generateRandomObject(i+1))
}

function generateRandomString(){
    return Math.random().toString(36).substring(2,11)
}

function generateRandomMatrix(){
    return Array.from({length:16}, () => Math.random() * 10 )
}

function generateRandomGeometry(){
    const trigger = Math.floor(Math.random()*3)
    if(trigger < 1){return "ConeGeometry"}
    else if (trigger < 2){return "SphereGeometry"}
    return "CubeGeometry"
}

function generateRandomHexcolor(){
    return "#".concat(Array.from({length: 6}, () => Math.floor(Math.random() * 16 - 0.001).toString(16)).join(""))
}