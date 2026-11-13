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

// El storage viejo guardaba el mail en "usuario": se normaliza al leer.
const leerSesion = () => {
    try {
        const s = JSON.parse(localStorage.getItem("usuario"))
        return s && typeof s === "object"
            ? { email: s.email ?? s.usuario, rol: s.rol, token: s.token }
            : null
    } catch {
        return null
    }
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion)

    const onLogin = (usuario) => {
        const sesion = { email: usuario.email, rol: usuario.rol, token: usuario.token }
        setUsuario(sesion)
        localStorage.setItem("usuario", JSON.stringify(sesion))
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