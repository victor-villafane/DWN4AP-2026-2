import { useEffect, useState } from "react"
import ItemLoading from "../components/ItemLoading"
import Item from "../components/Item"
import ItemError from "../components/ItemError"

export default function App() {

  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState("loading")

  const fetchApi = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products")
      const productosJson = await res.json()
      setProductos(productosJson)
      setEstado("ready")
    } catch (error) {
      setEstado("error")
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  let contenido = ""
  switch (estado) {
    case "loading":
      contenido = <ItemLoading />
      break
    case "ready":
      contenido = <Item productos={productos} />
      break
    default:
      contenido = <ItemError />
      break
  }

  return (
    <div>
      <h1 className="text-3xl" >Productos</h1>
      <table className="w-full" >
        <thead>
          <tr>
            <th className="p-3 text-xl bg-gray-300" >#</th>
            <th className="p-3 text-xl bg-gray-300" >Titulo</th>
            <th className="p-3 text-xl bg-gray-300" >Precio</th>
            <th className="p-3 text-xl bg-gray-300" >Categoria</th>
            <th className="p-3 text-xl bg-gray-300" >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contenido}
        </tbody>
      </table>
    </div>
  )
}
