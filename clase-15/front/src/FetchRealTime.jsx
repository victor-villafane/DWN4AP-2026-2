import { useEffect } from "react"
import { useState } from "react"

export default function FetchRealTime() {

    const [dolares, setDolares] = useState([])
    // const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const fetchApi = () => {
            fetch("https://dolarapi.com/v1/dolares")
                .then(res => res.json())
                .then(data => setDolares(data))
                .catch(err => console.log(err))
        }
        //1er renderizado
        fetchApi()
        const interval = setInterval( () => fetchApi(), 1000 )
        // setTimeout(() => setRefresh(!refresh), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <h1 className="text-xl text-white" >Dolares</h1>
            <table className="text-white w-full" >
                <thead>
                    <tr className="bg-gray-800" >
                        <th className="p-3 text-lg" >Nombre</th>
                        <th className="p-3 text-lg" >Compra</th>
                        <th className="p-3 text-lg" >Venta</th>
                        <th className="p-3 text-lg" >Actualizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dolares.map(dolar => (
                            <tr className="bg-gray-700 text-center" key={dolar.nombre} >
                                <td className="p-3 text-md" >{dolar.nombre}</td>
                                <td className="p-3 text-md" >{dolar.compra}</td>
                                <td className="p-3 text-md" >{dolar.venta}</td>
                                <td className="p-3 text-md" >{dolar.fechaActualizacion}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
