import React from 'react'
import { useState, useEffect } from 'react'

export default function FetchGeo() {

    const [ubicacion, setUbicacion] = useState()

    useEffect(() => {

        if (!navigator.geolocation) return

        // Configuraciones
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10,
        }
        function success(pos) {
            const { latitude, longitude, accuracy } = pos.coords;
            setUbicacion(
                {
                    latitud: latitude,
                    longitud: longitude,
                    precision: `${accuracy} metros`,
                    fecha: new Date().toLocaleDateString(),
                }
            )
        }
        function error(err) {
            console.log(err)
        }
        const watchId = navigator.geolocation.watchPosition(success, error, options)
        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    return (
        ubicacion?.latitud && <div className='text-white' >
            <p>Latitud: {ubicacion?.latitud}</p>
            <p>Longitud: {ubicacion?.longitud}</p>
            <p>Precision: {ubicacion?.precision}</p>
            <p>Fecha: {ubicacion?.fecha}</p>
           
        </div>
    )
}
