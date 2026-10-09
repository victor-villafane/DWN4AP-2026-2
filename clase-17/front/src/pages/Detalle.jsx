import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'

export default function Detalle() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [estado, setEstado] = useState("loading")

    useEffect(() => { }, [
        fetch("https://fakestoreapi.com/products/" + id)
            .then(res => res.json())
            .then(data => {
                setProducto(data)
                setEstado("ready")
            })
            .catch(err => setEstado("error"))
    ])

    if (estado == "loading") return <div>Loading</div>
    if (estado == "ready")
        return (
            <div className='w-full mx-auto p-5' >
                <p className='text-3xl' >{producto.title}</p>
                <div className='flex items-start justify-between' >
                    <img
                        src={producto.image}
                        alt=""
                    />
                </div>
                <div >
                    <p className='text-md' >{producto.price}</p>
                    <p className='text-md' >{producto.category}</p>
                    <p className='text-md' >{producto.description}</p>
                </div>
                <Link to="/listado" >Volver</Link>
            </div>
        )
}
