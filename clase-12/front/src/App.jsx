import { useState } from "react"

const App = () => {

  const [contador, setContador] = useState(0)
  const [personajes, setPersonajes] = useState(
    [
      {
        id: 1,
        nombre: "Homero",
        descripcion: "ASD",
        color: "red"
      },
      {
        id: 2,
        nombre: "Marge",
        descripcion: "ASD",
        color: "blue"
      },
      {
        id: 3,
        nombre: "Lisa",
        descripcion: "ASD",
        color: "orange"
      },
      {
        id: 4,
        nombre: "Bart",
        descripcion: "ASD",
        color: "black"
      },
      {
        id: 5,
        nombre: "Maggie",
        descripcion: "ASD",
        color: "white"
      }
    ]
  )
  const [personaje, setPersonaje] = useState(
    {
      nombre: "",
      descripcion: ""
    }
  )
  const [errores, setErrores] = useState({})

  const handleClick = (indice) => {
    const personajesCopia = [...personajes]
    personajesCopia.splice(indice, 1)
    setPersonajes(personajesCopia)
  }

  const handleSumar = () => {
    // console.log(contador)
    setContador(contador + 1)
  }

  const handleNombre = (event) => {
    console.log(event.target.value)
    setPersonaje({ ...personaje, nombre: event.target.value })

    if (personaje.nombre?.length < 3) {
      setErrores({ ...errores, nombre: "El nombre debe tener mas de 3 caracteres" })
    } else {
      setErrores({ ...errores, nombre: "" })
    }
  }
  const handleDescripcion = (event) => {
    console.log(event.target.value)
    setPersonaje({ ...personaje, descripcion: event.target.value })

    if (personaje.descripcion?.length < 3) {
      setErrores({ ...errores, descripcion: "El descripcion debe tener mas de 3 caracteres" })
    } else {
      setErrores({ ...errores, descripcion: "" })
    }
  }
  const guardarPersonaje = () => {
    const personajesCopia = [...personajes]
    personajesCopia.push({
      id: personajes.length + 1,
      ...personaje
    })
    setPersonajes(personajesCopia)
  }



  return (
    <div className="text-white p-4" >
      <input type="text" placeholder="Nombre" onChange={handleNombre} />
      {errores?.nombre}
      <input type="text" placeholder="Descripcion" onChange={handleDescripcion} />
      {errores?.descripcion}
      <button onClick={guardarPersonaje} >Guardar</button>
      {
        <table className="w-full max-w-2xl table-auto border-collapse border border-gray-750 text-left" >
          <thead>
            <tr className="bg-gray-800" >
              <th className="border border-gray-700 p-3" >#</th>
              <th className="border border-gray-700 p-3" >Nombre</th>
              <th className="border border-gray-700 p-3" >Descripcion</th>
              <th className="border border-gray-700 p-3" >Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              personajes.map((personaje, indice) => (
                <tr className="hover:bg-gray-800/50" key={indice} >
                  <td className="border border-gray-700 p-3" >{personaje.id}</td>
                  <td className="border border-gray-700 p-3" >{personaje.nombre}</td>
                  <td className="border border-gray-700 p-3" >{personaje.descripcion}</td>
                  <td className="border border-gray-700 p-3" >
                    <button className="rounded bg-red-600 px-4 py-1.5 text-sm" onClick={() => handleClick(indice)}>Borrar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default App