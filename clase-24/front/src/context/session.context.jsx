import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"
export const context = createContext()

export function useSession() {
    return useContext(context)
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useRol() {
    const { onRol } = useSession()
    return onRol
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    )

    const onLogin = (usuario) => {
        setUsuario(usuario)
        localStorage.setItem("usuario", JSON.stringify({
            usuario: usuario.email,
            rol: usuario.rol,
            token: usuario.token
        }))
    }

    const onLogout = () => {
        localStorage.clear()
        setUsuario(null)
    }

    const onRol = () => {
        if (usuario?.token) {
            const payload = jwtDecode(usuario?.token)
            return payload.rol
        }
    }

    return (
        <context.Provider value={{ usuario, onLogin, onLogout, onRol }} >
            {children}
        </context.Provider>
    )
} 