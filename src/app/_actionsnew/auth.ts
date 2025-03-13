import { BaseUserInfo } from "./actions"
import { AUTH_ROUTE, errorHandler } from "./utils"



const ERROR_FROM = "AUTH ACTION"

export async function login(props: BaseUserInfo){
    return await fetch(AUTH_ROUTE, {
        method: "POST",
        body: JSON.stringify(props)
    })
    .then(r => errorHandler(ERROR_FROM, r))
}
