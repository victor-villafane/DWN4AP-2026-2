import { Link } from 'react-router'
import { context } from '../context/session.context'
import { useContext } from 'react'

export default function Nav() {
    const datos = useContext(context)
    console.log(datos)
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    return (
        <div className='w-full bg-gray-100 sticky top-0 z-40 flex items-center justify-between p-5' >
            <div className='flex items-center space-x-1 sm:space-x-3' >
                <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/">Home</Link>
                {usuario
                    && ["admin", "superadmin", "user"].includes(usuario.rol)
                    && <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/listado">Listado</Link>}
                <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/contact">Contacto</Link>
                {!usuario && <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/login">Login</Link>}
                {!usuario && <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/register">Registro</Link>}
                {usuario && <Link className="px-1 py-3 text-sm font-medium text-gray-600" to="/salir">Logout</Link>}
            </div>
        </div>
    )
}
