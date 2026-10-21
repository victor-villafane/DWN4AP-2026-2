import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"

export default function BorrarJuego() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [estado, setEstado] = useState("loading")

    const navigate = useNavigate()

    useEffect(() => { }, [
        fetch("http://localhost:2026/api/juegos/" + id)
            .then(res => res.json())
            .then(data => {
                setProducto(data)
                setEstado("ready")
            })
            .catch(err => setEstado("error"))
    ])

    const handleBorrar = (e) => {
        e.preventDefault()
        fetch("http://localhost:2026/api/juegos/" + id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => navigate("/listado"))
            .catch(err => console.log(err))
    }

    if (estado == "loading") return <div>Loading</div>
    if (estado == "ready")
        return (
            <div className='w-full mx-auto p-5' >
                <p className='text-3xl' >{producto.name}</p>
                <div >
                    <p className='text-md' >{producto.price}</p>
                    <p className='text-md' >{producto.category}</p>
                    <p className='text-md' >{producto.platforms}</p>
                </div>
                <form onSubmit={handleBorrar} >
                    <button type="submit" >Borrar</button>
                </form>
                <Link to="/listado" >Volver</Link>
            </div>
        )
}
