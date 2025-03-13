export const PROJECT_ROUTES = "/api/projects"
export const USER_ROUTE = "/api/users"
export const AUTH_ROUTE = "/api/auth"

export const errorHandler = async (from: string, r: Response) => {
    if(r.ok) {return await r.json()}
    else {
        const message = await r.text()
        console.debug(from, message)
        return {error: message}
    }
}