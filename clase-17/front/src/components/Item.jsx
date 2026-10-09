import React from 'react'
import { Link } from 'react-router'

export default function Item({productos}) {
    return (
        productos.map(producto => (
            <tr key={producto.id}>
                <td className="p-3 text-md bg-gray-100" >
                    <img width="100px" src={producto.image} alt="" />
                </td>
                <td className="p-3 text-md bg-gray-100" >{producto.title}</td>
                <td className="p-3 text-md bg-gray-100" >{producto.price}</td>
                <td className="p-3 text-md bg-gray-100" >{producto.category}</td>
                <td className="p-3 text-md bg-gray-100" >
                    <Link to={`/productos/${producto.id}`} >Ver</Link>
                </td>
            </tr>
        ))
    )
}
