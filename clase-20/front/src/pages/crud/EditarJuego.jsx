import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { juegosShema } from "../../schemas/juegos"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react"

export default function EditarJuego() {

    const { id } = useParams()
    useEffect(() => {
        fetch("http://localhost:2026/api/juegos/" + id)
            .then(res => res.json())
            .then(data => {
                data.platforms = data.platforms.split(";")
                const {_id, ...valores} = data
                reset(valores)
            })
            .catch(err => console.log(err))
    }, [])

    const {
        register,       //Conecta cada input con el formulario
        handleSubmit,   // Valida( usando zod ) y luego llama a nuestro submit
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(juegosShema)
    })

    const navigate = useNavigate()
    const onSubmit = (juego) => {
        console.log(juego)
        fetch("http://localhost:2026/api/juegos/"+id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(juego)
        })
            .then(res => {
                if( res.ok ) return res.json()
                else throw new Error()
            })
            .then(data => navigate("/productos/" + data._id))
            .catch(err => console.log(err))
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-100 px-4 py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto w-full max-w-xl rounded-xl bg-white p-6 shadow-md"
            >
                <h1 className="mb-6 text-2xl font-bold text-slate-800">Editar juego</h1>

                <div className="mb-4">
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Nombre:</label>
                    <input
                        type="text"
                        {...register("name")}
                        id="name"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.name && <div className="mt-1 text-sm text-red-600" >{errors.name.message}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="developer" className="mb-1 block text-sm font-medium text-slate-700">Desarrollador:</label>
                    <input
                        type="text"
                        {...register("developer")}
                        id="developer"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.developer &&
                        <div className="mt-1 text-sm text-red-600" >{errors.developer.message}</div>
                    }
                </div>

                <div className="mb-4">
                    <label htmlFor="publisher" className="mb-1 block text-sm font-medium text-slate-700">Distribuidor:</label>
                    <input
                        type="text"
                        {...register("publisher")}
                        id="publisher"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.publisher &&
                        <div className="mt-1 text-sm text-red-600" >{errors.publisher.message}</div>
                    }
                </div>

                <div className="mb-4">
                    <label htmlFor="platforms" className="mb-1 block text-sm font-medium text-slate-700">Plataformas:</label>
                    <select
                        {...register("platforms", {
                            setValueAs: (v) => {
                                return v.join(";")
                            }
                        })}
                        id="platforms"
                        multiple
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="mac">mac</option>
                        <option value="windows">windows</option>
                        <option value="linux">linux</option>
                    </select>
                    {errors.platforms &&
                        <div className="mt-1 text-sm text-red-600" >{errors.platforms.message}</div>
                    }
                </div>

                <div className="mb-4">
                    <label htmlFor="categories" className="mb-1 block text-sm font-medium text-slate-700">Categoria:</label>
                    <input
                        type="text"
                        {...register("categories")}
                        id="categories"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.categories &&
                        <div className="mt-1 text-sm text-red-600" >{errors.categories.message}</div>
                    }
                </div>

                <div className="mb-4">
                    <label htmlFor="genres" className="mb-1 block text-sm font-medium text-slate-700">Generos:</label>
                    <input
                        type="text"
                        {...register("genres")}
                        id="genres"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.genres &&
                        <div className="mt-1 text-sm text-red-600" >{errors.genres.message}</div>
                    }
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-700">Precio:</label>
                    <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        id="price"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.price &&
                        <div className="mt-1 text-sm text-red-600" >{errors.price.message}</div>
                    }
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}