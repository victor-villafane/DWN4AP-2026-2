import { Link } from "react-router";
import { usersSchema } from "../../schemas/users"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router";
import { Activity } from "react";
import { useApiUsuarios } from "../../services/usuarios.service";

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(usersSchema), criteriaMode: "all" })
    const { register: registerApi } = useApiUsuarios()
    const onSubmit = async (usuario) => {
        registerApi(usuario)
            .then(res => navigate("/login"))
            .catch(err => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Registrar</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                        <input id="email" type="email" {...register("email")} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-sm text-red-500">{errors.email ? errors.email.message : ""}</p>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm text-gray-700">Nombre:</label>
                        <input id="name" type="text" {...register("name")} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-sm text-red-500">{errors.name ? errors.name.message : ""}</p>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm text-gray-700">Contraseña</label>
                        <input id="password" type="text" {...register("password")} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <div className="text-sm text-red-500" >

                            {
                                typeof errors.password?.types?.invalid_format == "object" // esto es un array
                                    ? errors.password?.types?.invalid_format?.map(err => <p>{err}</p>)
                                    : errors.password?.message
                            }
                        </div>

                    </div>
                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-700">Confirmar contraseña</label>
                        <input id="confirmPassword" type="text" {...register("confirmPassword")} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-sm text-red-500">{errors.confirmPassword ? errors.confirmPassword.message : ""}</p>
                    </div>
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 rounded-md transition-colors"
                    >
                        Registar
                    </button>
                </form>
                <Link to="/login" className="block text-center text-sm text-blue-600 hover:underline" >
                    Ir a login
                </Link>
            </div>
        </div>
    )
}