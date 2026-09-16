// rfc
// export default function App() { //functional component
//   // Logica
//   console.log("Hola!")
//   // Visual
//   return (
//     <div>
//       Hola!
//     </div>
//   )
// }
// rafce
// const App = () => {
//   console.log("Hola!")
//   return (
//     <div>
//       Hola!
//     </div>
//   )
// }
// export default App
// rcc
// class App extends React.Component{
//   render(){
//     return (
//       <div></div>
//     )
//   }
// }
import React from 'react'

const App = () => {

  const mensaje = "Hola!"
  // const personajes = ["Homero", "Marge", "Lisa", "Bart", "Maggie"]

  const personajes = [
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

  const color = (personajeColor) => {
    return { backgroundColor: personajeColor ?? "black" }
  }

  return (
    <div>
      {
        personajes.map(
          (personaje, index) =>
            <p className='' key={index} style={color(personaje?.color)}>
              {personaje?.nombre}
            </p>
        )
      }
    </div>
  )
}

export default App