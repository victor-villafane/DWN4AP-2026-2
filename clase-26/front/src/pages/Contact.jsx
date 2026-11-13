import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bounce, toast } from "react-toastify"
import { contactoSchema } from "../schemas/contacto"

const datosContacto = [
    {
        etiqueta: "Email",
        valor: "soporte@ejemplo.com",
        href: "mailto:soporte@ejemplo.com",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        ),
    },
    {
        etiqueta: "Telefono",
        valor: "+54 11 0000-0000",
        href: "tel:+541100000000",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        ),
    },
    {
        etiqueta: "Direccion",
        valor: "Buenos Aires, Argentina",
        href: null,
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        ),
    },
]

const redes = [
    { nombre: "GitHub", href: "https://github.com" },
    { nombre: "Instagram", href: "https://instagram.com" },
    { nombre: "X", href: "https://x.com" },
    { nombre: "Discord", href: "https://discord.com" },
]

const inputClass =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contactoSchema),
    })

    const onSubmit = async (data) => {
        try {
            // Sin backend todavia: se resuelve en el cliente
            console.log("Mensaje de contacto:", data)
            toast.success("Mensaje enviado. Te responderemos a la brevedad", { transition: Bounce })
            reset()
        } catch {
            toast.error("No se pudo enviar el mensaje. Intenta de nuevo", { transition: Bounce })
        }
    }

    const campo = (name, label, extra = {}) => (
        <div className="mb-4">
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                type="text"
                id={name}
                aria-invalid={errors[name] ? "true" : "false"}
                className={inputClass}
                {...register(name)}
                {...extra}
            />
            {errors[name] && (
                <div role="alert" className="mt-1 text-sm text-red-600">
                    {errors[name].message}
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-100 px-4 py-8">
            <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_2fr]">
                {/* DATOS DE CONTACTO Y REDES */}
                <aside className="h-fit rounded-xl bg-white p-6 shadow-md">
                    <h1 className="text-2xl font-bold text-slate-800">Contacto</h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        Consultas de soporte, alianzas o prensa. Respondemos en menos de 48 horas
                        habiles.
                    </p>

                    <ul className="mt-6 space-y-4">
                        {datosContacto.map((dato) => {
                            const contenido = (
                                <>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.6}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        >
                                            {dato.icono}
                                        </svg>
                                    </span>
                                    <span>
                                        <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                                            {dato.etiqueta}
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">
                                            {dato.valor}
                                        </span>
                                    </span>
                                </>
                            )

                            return (
                                <li key={dato.etiqueta}>
                                    {dato.href ? (
                                        <a
                                            href={dato.href}
                                            className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
                                        >
                                            {contenido}
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 rounded-lg p-2">
                                            {contenido}
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Seguinos
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {redes.map((red) => (
                                <a
                                    key={red.nombre}
                                    href={red.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
                                >
                                    {red.nombre}
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* FORMULARIO */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="rounded-xl bg-white p-6 shadow-md"
                >
                    <h2 className="mb-1 text-2xl font-bold text-slate-800">Envianos un mensaje</h2>
                    <p className="mb-6 text-sm text-slate-500">
                        Completa el formulario y te responderemos por email.
                    </p>

                    {campo("nombre", "Nombre:")}
                    {campo("email", "Email:", { type: "email" })}
                    {campo("asunto", "Asunto:")}

                    <div className="mb-6">
                        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-slate-700">
                            Mensaje:
                        </label>
                        <textarea
                            id="mensaje"
                            rows={5}
                            aria-invalid={errors.mensaje ? "true" : "false"}
                            className={inputClass}
                            {...register("mensaje")}
                        />
                        {errors.mensaje && (
                            <div role="alert" className="mt-1 text-sm text-red-600">
                                {errors.mensaje.message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </button>
                </form>
            </div>
        </div>
    )
}
