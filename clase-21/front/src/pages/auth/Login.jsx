import React from 'react'
import { useNavigate } from 'react-router'
import { call } from '../../services/api.service'

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        const usuario = await call("/login", "POST", {email, password: pass})

        localStorage.setItem("usuario", JSON.stringify({
            usuario: usuario.email,
            rol: usuario.rol,
            token: usuario.token
        }))
        navigate("/listado")

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="">Pass:</label>
                    <input type="text" name="pass" id="pass" />
                </div>
                <button>Ingresar</button>
            </form>
        </div>
    )
}
