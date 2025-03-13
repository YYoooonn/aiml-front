import { RegisterInfo, UserUpdateInfo } from "./actions"
import { errorHandler, USER_ROUTE } from "./utils"

const ERROR_FROM = "USER ACTION"

export async function create(props: RegisterInfo){
    return await fetch(USER_ROUTE, {
        method: "POST",
        body: JSON.stringify(props)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function read(username?: string){
    const id = username? username : "me"
    return await fetch(`${USER_ROUTE}/${id}`, {method: "GET"}).then(r => errorHandler(ERROR_FROM, r))
}

export async function update({username, userInfos}: {username?:string, userInfos: UserUpdateInfo}){
    const id = username? username : "me"
    return await fetch(`${USER_ROUTE}/${id}`, {method: "PUT", body: JSON.stringify(userInfos)}).then(r => errorHandler(ERROR_FROM, r))
}

export async function remove(username?: string){
    const id = username? username : "me"
    return await fetch(`${USER_ROUTE}/${id}`, {method: "DELETE"}).then(r => errorHandler(ERROR_FROM, r))
}

export async function readEntity(props : {username? : string, entity?: string}){
    const id = props.username? props.username : "me"
    return await fetch(`${USER_ROUTE}/${id}/${props.entity}`, {method: "GET"}).then(r => errorHandler(ERROR_FROM, r))
}