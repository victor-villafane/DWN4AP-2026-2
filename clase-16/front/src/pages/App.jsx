import { useEffect, useState } from "react"
import ItemLoading from "../components/ItemLoading"
import Item from "../components/Item"
import ItemError from "../components/ItemError"

export default function App() {

  const [cryptos, setCrypto] = useState([])
  const [estado, setEstado] = useState("loading")
  const [selected, setSelected] = useState(null)
  const fetchApi = async () => {
    // const url = 'https://api.coinlayer.com/list?access_key=2420f6e00f425a657d396bc3e96afc3a';
    // const options = {
    //   method: 'GET',
    //   headers: { Accept: 'application/json, application/json; Charset=UTF-8' }
    // };

    // try {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    //   console.log(data)
    //   setCrypto(Object.values(data.crypto));
    //   setEstado("ready")
    // } catch (error) {
    //   console.error(error);
    //   setEstado("error")
    // }
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
      contenido = <Item cryptos={cryptos} setSelected={setSelected} />
      break
    default:
      contenido = <ItemError />
      break
  }

  return (
    <div>
      <h1 className="text-3xl" >Coin</h1>
      { selected && <div>{selected.name}</div> }
      <table className="w-full" >
        <thead>
          <tr>
            <th className="p-3 text-xl bg-gray-300" >#</th>
            <th className="p-3 text-xl bg-gray-300" >Simbolo</th>
            <th className="p-3 text-xl bg-gray-300" >Nombre</th>
            <th className="p-3 text-xl bg-gray-300" >Nombre Completo</th>
            <th className="p-3 text-xl bg-gray-300" >max_supply</th>
          </tr>
        </thead>
        <tbody>
          {contenido}
        </tbody>
      </table>
    </div>
  )
}
