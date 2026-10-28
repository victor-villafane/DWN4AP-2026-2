import React from 'react'

export default function ItemLoading() {
    return (
        [1, 2, 3, 4].map(numero => (
            <tr className="animate-pulse" key={numero} >
                <td className="p-3 text-md bg-gray-200" ><div className="" ></div></td>
                <td className="p-3 text-md bg-gray-200" ><div className="" ></div></td>
                <td className="p-3 text-md bg-gray-200" ><div className="" ></div></td>
                <td className="p-3 text-md bg-gray-200" ><div className="" >{numero == 2 && "Cargando..."}</div></td>
                <td className="p-3 text-md bg-gray-200" ><div className="" ></div></td>
            </tr>))
    )
}
