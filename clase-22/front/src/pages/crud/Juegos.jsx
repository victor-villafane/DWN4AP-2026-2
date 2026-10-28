import { useEffect, useState } from "react"
import ItemLoading from "../../components/ItemLoading"
import Item from "../../components/Item"
import ItemError from "../../components/ItemError"
import { Link } from "react-router"
import { useApiJuegos } from "../../services/juegos.service"

export default function Juegos() {

  const [juegos, setJuegos] = useState([])
  const [estado, setEstado] = useState("loading")

  const { getJuegos } = useApiJuegos()

  const fetchApi = async () => {
    try {
      const juegosJson = await getJuegos()
      juegosJson.pop()
      setJuegos(juegosJson)
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
      contenido = <Item juegos={juegos} />
      break
    default:
      contenido = <ItemError />
      break
  }

  return (
    <div>
      <h1 className="text-3xl" >Juegos</h1>
      <Link to="/nuevo-juego" >Nuevo producto</Link>
      <table className="w-full" >
        <thead>
          <tr>
            <th className="p-3 text-xl bg-gray-300" >#</th>
            <th className="p-3 text-xl bg-gray-300" >Nombre</th>
            <th className="p-3 text-xl bg-gray-300" >Plataforma</th>
            <th className="p-3 text-xl bg-gray-300" >Categoria</th>
            <th className="p-3 text-xl bg-gray-300" >Precio</th>
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
