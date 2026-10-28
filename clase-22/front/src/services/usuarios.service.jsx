import { call } from "./api.service";
export function useApiUsuarios(){
    
    const login = (usuario) => call("/login", "POST", usuario)
    const register = (usuario) => call("/users", "POST", usuario)

    return {
        login,
        register
    }
}