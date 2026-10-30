import { useEffect, useState } from "react"
import { useApiUsuarios } from "../services/usuarios.service"
import { Link } from "react-router"
import { Bounce, toast } from "react-toastify"

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState()
    const [nuevoRol, setNuevoRol] = useState()
    const { getUsuarios, asignarRol, resetPassword } = useApiUsuarios()
    useEffect(() => {
        getUsuarios()
            .then((data) => setUsuarios(data))
            .catch(err => console.log(err))
    }, [])

    const handleAsignar = (usuario) => {
        asignarRol({ usuario: usuario, rol: nuevoRol })
            .then(() => getUsuarios())
            .then((data) => {
                setUsuarios(data)
                toast.success('Rol asignado correctamnete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((err) => {
                toast.error('No se pudo asignar rol', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    const handleReset = (usuario) => {
        resetPassword(usuario)
            .then((data) => {
                toast.success('Password asignado correctamnete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((err) => {
                toast.error('No se pudo asignar el password', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    return (
        <div>
            <h1 className="text-3xl" >Usuarios</h1>
            <table className="w-full" >
                <thead>
                    <tr>
                        <th className="p-3 text-xl bg-gray-300" >#</th>
                        <th className="p-3 text-xl bg-gray-300" >Nombre</th>
                        <th className="p-3 text-xl bg-gray-300" >Email</th>
                        <th className="p-3 text-xl bg-gray-300" >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios?.map(usuario => (
                            <tr key={usuario._id}>
                                <td className="p-3 text-md bg-gray-100" >{usuario._id}</td>
                                <td className="p-3 text-md bg-gray-100" >{usuario.name}</td>
                                <td className="p-3 text-md bg-gray-100" >{usuario.email}</td>
                                <td className="p-3 text-md bg-gray-100" >
                                    <select onChange={(e) => setNuevoRol(e.target.value)} defaultValue={usuario?.rol ?? "user"} >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        <option value="superadmin">superadmin</option>
                                    </select>
                                    <button onClick={() => handleAsignar(usuario)} className='m-1 text-blue-800'>Asignar</button>
                                    <button onClick={() => handleReset(usuario)} className='m-1 text-blue-800'>Reset</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}