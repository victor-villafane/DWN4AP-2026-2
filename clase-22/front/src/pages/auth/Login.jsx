import React from 'react'
import { useNavigate } from 'react-router'
import { call } from '../../services/api.service'
import { useApiUsuarios } from '../../services/usuarios.service'

export default function Login() {

    const navigate = useNavigate()
    const { login } = useApiUsuarios()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        const usuario = await login({email: email, password: pass})

        localStorage.setItem("usuario", JSON.stringify({
            usuario: usuario.email,
            rol: usuario.rol,
            token: usuario.token
        }))
        navigate("/listado")

    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4" >
                <h1 className="text-xl font-semibold text-gray-800 text-center">Iniciar sesión</h1>
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="pass" className="block text-sm text-gray-700">Pass:</label>
                    <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors">
                    Ingresar
                </button>
            </form>
        </div>
    )
}
