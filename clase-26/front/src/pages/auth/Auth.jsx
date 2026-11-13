import { useNavigate } from "react-router"
import { supabase } from "../../services/supabase"
import { useLogin } from "../../context/session.context"
import { useEffect } from "react"

export default function Auth() {
    const navigate = useNavigate()
    const login = useLogin()
    useEffect( () => {
        supabase.auth.getSession()
            .then(async (data) => {
                console.log(data.data.session.access_token)
                const response = await fetch("http://localhost:2026/api/users/social-login", {
                    headers:{
                        authorization: "Bearer " + data.data.session.access_token,
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                })
                if (!response.ok) navigate("/login")
                const usuario = await response.json()
                login(usuario)
                navigate("/")
            })
            .catch(err => console.error(err))
    }, [] )

    return <div></div>
}