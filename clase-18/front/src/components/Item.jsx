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
                    <Link to={`/productos/${juego._id}`} >Ver</Link>
                </td>
            </tr>
        ))
    )
}
