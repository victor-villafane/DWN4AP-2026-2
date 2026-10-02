import React from 'react'
import { useState, useEffect } from 'react'

export default function Fetch() {

    const [personajes, setPersonajes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchApi = (uri = "https://api.disneyapi.dev/character") => {
        fetch(uri)
            .then(res => res.json())
            .then((data) => {
                setPersonajes(data.data)
            })
    }

    useEffect(() => {
        // componentDidMount() se invoca inmediatamente después de que un componente se monte
        console.log("componentDidMount")
        fetchApi(`https://api.disneyapi.dev/character?page=${currentPage}&pageSize=50`)
        return () => {
            console.log("componentDidUnMount")
        }
    }, [currentPage])

    // useEffect(() => {
    //     console.log("componentDidUpdate")
    // componentDidUpdate se invoca inmediatamente después de que la actualización ocurra
    //     // componentDidUpdate() se invoca inmediatamente después de que un componente se monte
    //     fetchApi(
    //         `https://api.disneyapi.dev/character?page=${currentPage}&pageSize=50`
    //     )
    // }, [currentPage])

    return (
        <div>
            {personajes.map(personaje =>
                <p className='text-white' key={personaje._id} >{personaje.name}</p>)}
            <button
                className='text-white'
                onClick={() => setCurrentPage(currentPage - 1)} >
                Prev
            </button>
            <button
                className='text-white'
                onClick={() => setCurrentPage(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}
