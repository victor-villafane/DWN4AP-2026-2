import { call } from "./api.service";
export function useApiUsuarios(){
    
    const login = (usuario) => call("/login", "POST", usuario)
    const register = (usuario) => call("/users", "POST", usuario)

    const getUsuarios = () => call("/users")
    const asignarRol = (datos) => call("/users/asignar", "POST", datos)
    const resetPassword = (usuario) => call("/users/reset", "POST", usuario)

    return {
        login,
        register,
        getUsuarios,
        asignarRol,
        resetPassword
    }
}