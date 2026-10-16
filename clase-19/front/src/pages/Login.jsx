import React from 'react'
import { useNavigate } from 'react-router'

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value
        
        if( email == "admin@admin.com" && pass == "123456" ){
            localStorage.setItem("usuario", JSON.stringify({
                usuario: "admin@admin.com",
                rol: "admin"
            }))
            navigate("/listado")
        }else{
            console.log("usuario o contraseña incorrectos")
        }
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
