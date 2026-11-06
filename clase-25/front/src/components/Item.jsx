import React from 'react'
import { Link } from 'react-router'

export default function Item({juegos}) {
    return (
        juegos.map(juego => (
            <tr key={juego._id}>
                <td className="p-3 text-md bg-gray-100" >{juego._id}</td>
                <td className="p-3 text-md bg-gray-100" >{juego.name}</td>
                <td className="p-3 text-md bg-gray-100" >{juego.platforms}</td>
                <td className="p-3 text-md bg-gray-100" >{juego.category}</td>
                <td className="p-3 text-md bg-gray-100" >{juego.price}</td>
                <td className="p-3 text-md bg-gray-100" >
                    <Link className='m-1 text-blue-800' to={`/productos/${juego._id}`} >Ver</Link>
                    <Link className='m-1 text-amber-600-800' to={`/editar/${juego._id}`} >Editar</Link>
                    <Link className='m-1 text-red-800' to={`/eliminar/${juego._id}`} >Eliminar</Link>
                </td>
            </tr>
        ))
    )
}
