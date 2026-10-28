import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { useApiJuegos } from '../../services/juegos.service'

export default function Detalle() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [estado, setEstado] = useState("loading")
    const { getJuegoById } = useApiJuegos()
    
    useEffect(() => {  
        getJuegoById(id)
            .then(data => {
                setProducto(data)
                setEstado("ready")
            })
            .catch(err => setEstado("error"))
    }, [])

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
                <Link to="/listado" >Volver</Link>
            </div>
        )
}
