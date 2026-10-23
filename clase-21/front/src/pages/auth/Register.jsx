import { Link } from "react-router";
import { usersSchema } from "../../schemas/users"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router";
import { Activity } from "react";
import { call } from "../../services/api.service";
export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(usersSchema), criteriaMode: "all" })

    const onSubmit = async (usuario) => {
        call("/users", "POST", usuario)
            .then(res => navigate("/login"))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2 className="text-3xl" >Registrar</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email")} />
                    {errors.email ? errors.email.message : ""}
                </div>
                <div>
                    <label htmlFor="name">Nombre: </label>
                    <input type="text" {...register("name")} />
                    {errors.name ? errors.name.message : ""}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="text" {...register("password")} />
                    <div className="text-red-500" >

                        {
                            typeof errors.password?.types?.invalid_format == "object" // esto es un array
                                ? errors.password?.types?.invalid_format?.map(err => <p>{err}</p>)
                                : errors.password?.message
                        }
                    </div>

                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input type="text" {...register("confirmPassword")} />
                    {errors.confirmPassword ? errors.confirmPassword.message : ""}
                </div>
                <button disabled={isSubmitting} type="submit" >Registar</button>
            </form>
            <Link to="/login" >Ir a login</Link>
        </div>
    )
}