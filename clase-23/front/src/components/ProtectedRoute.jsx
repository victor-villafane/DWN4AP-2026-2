import { Navigate } from 'react-router'
import { useRol, useUsuario } from '../context/session.context'

export default function ProtectedRoute({ element, rol }) {
    const usuario = useUsuario()
    const rolAuth = useRol()
    console.log(rolAuth(), rol)
    if (usuario && rol.includes( rolAuth() )) return element
    if (usuario) return <Navigate to="/" />
    return <Navigate to="/login" />
}
