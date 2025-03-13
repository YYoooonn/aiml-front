import { BaseProjectProps, ProjectSearchParams, ProjectUpdateProps } from "./actions";
import { errorHandler, PROJECT_ROUTES } from "./utils";

const ERROR_FROM = "PROJECT ACTION"

export async function search({k,n,s}: ProjectSearchParams){
    return await fetch(`${PROJECT_ROUTES}/search?keyword=${k}&pageNum=${n}&pageSize=${s}`, {method: "GET"})
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function create(props: BaseProjectProps){
    return await fetch(PROJECT_ROUTES, {
        method: "POST",
        body: JSON.stringify(props)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function read(id : string){
    return await fetch(`${PROJECT_ROUTES}/${id}`, {
        method: "GET",
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function update({id, infos} : {id : string, infos: ProjectUpdateProps}){
    return await fetch(`${PROJECT_ROUTES}/${id}`, {
        method: "PUT",
        body: JSON.stringify(infos)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function remove({id} : {id : string}){
    return await fetch(`${PROJECT_ROUTES}/${id}`, {
        method: "DELETE"
    })
    .then(r => errorHandler(ERROR_FROM, r))
}