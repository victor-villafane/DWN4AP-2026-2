import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { useApiJuegos } from "../../services/juegos.service"

export default function BorrarJuego() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [estado, setEstado] = useState("loading")

    const navigate = useNavigate()
    const { deleteJuego, getJuegoById } = useApiJuegos()
    useEffect(() => {
        getJuegoById(id)
            .then(data => {
                setProducto(data)
                setEstado("ready")
            })
            .catch(err => setEstado("error"))
    }, [])

    const handleBorrar = (e) => {
        e.preventDefault()
        deleteJuego(id)
            .then(data => navigate("/listado"))
            .catch(err => {
                navigate("/salir")
            })
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
