import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { juegosShema } from "../schemas/juegos"
import { zodResolver } from '@hookform/resolvers/zod';

export default function NuevoJuego() {
    // 1. Conectar el useForm con el schema
    const {
        register,       //Conecta cada input con el formulario
        handleSubmit,   // Valida( usando zod ) y luego llama a nuestro submit
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(juegosShema)
    })

    const navigate = useNavigate()
    const onSubmit = (juego) => {

        fetch("http://localhost:2026/api/juegos", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(juego)
        })
            .then(res => res.json())
            .then(data => navigate("/productos/" + data._id))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" {...register("name")} id="name" />
                    {errors.name && <div className="text-red-600" >{errors.name.message}</div>}
                </div>
                <div>
                    <label htmlFor="">Desarrollador: </label>
                    <input type="text" {...register("developer")} id="developer" />
                    {errors.developer &&
                        <div className="text-red-600" >{errors.developer.message}</div>
                    }
                </div>
                <div>
                    <label htmlFor="">Distribuidor: </label>
                    <input type="text"  {...register("publisher")} id="publisher" />
                    {errors.publisher &&
                        <div className="text-red-600" >{errors.publisher.message}</div>
                    }
                </div>
                <div>
                    <label htmlFor="">Plataformas:</label>
                    <select {...register("platforms")} id="platforms">
                        <option defaultChecked></option>
                        <option value="mac">mac</option>
                        <option value="windows">windows</option>
                        <option value="linux">linux</option>
                    </select>
                    {errors.platforms &&
                        <div className="text-red-600" >{errors.platforms.message}</div>
                    }
                </div>
                <div>
                    <label htmlFor="">Categoria:</label>
                    <input type="text" {...register("categories")} id="categories" />
                    {errors.categories &&
                        <div className="text-red-600" >{errors.categories.message}</div>
                    }
                </div>
                <div>
                    <label htmlFor="">Generos:</label>
                    <input type="text"  {...register("genres")} id="genres" />
                    {errors.genres &&
                        <div className="text-red-600" >{errors.genres.message}</div>
                    }
                </div>
                <div>
                    <label htmlFor="">Precio:</label>
                    <input type="number"
                        {...register("price", { valueAsNumber: true })} id="price" />
                    {errors.price &&
                        <div className="text-red-600" >{errors.price.message}</div>
                    }
                </div>
                <button type="submit" >Guardar</button>
            </form>
        </div>
    )
}