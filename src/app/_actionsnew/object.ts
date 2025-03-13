import { ObjConstructor, ObjUpdateProps, ProjectUpdateProps } from "./actions";
import { errorHandler, PROJECT_ROUTES } from "./utils";

const ERROR_FROM = "OBJ ACTION"

export async function create({proId, objProps} : {proId: string, objProps: ObjConstructor}){
    return await fetch(`${PROJECT_ROUTES}/${proId}/objects`, {
        method: "POST",
        body: JSON.stringify(objProps)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}



export async function read({proId, oId} : {proId: string, oId:string}){
    return await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
        method: "GET",
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function update({proId, oId, objProps} : {proId: string, oId:string, objProps: ObjUpdateProps}){
    return await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
        method: "PUT",
        body: JSON.stringify(objProps)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}

export async function remove({proId, oId} : {proId: string, oId:string}){
    return await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
        method: "DELETE"
    })
    .then(r => errorHandler(ERROR_FROM, r))
}