import { useEffect, useState } from "react"
import { Link } from "react-router"
import hero from "../assets/hero.png"
import { useUsuario } from "../context/session.context"
import { useApiJuegos } from "../services/juegos.service"

const features = [
    {
        titulo: "Catálogo amplio",
        texto: "Juegos de todas las plataformas y categorías, ordenados para que encuentres rápido lo que buscás.",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        ),
    },
    {
        titulo: "Precios claros",
        texto: "Sin sorpresas: cada título muestra su precio y categoría a la vista, antes de entrar al detalle.",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        ),
    },
    {
        titulo: "Todas las plataformas",
        texto: "Filtrá por plataforma o categoría y compará títulos de PC, consolas y mobile en un solo lugar.",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
        ),
    },
    {
        titulo: "Acceso seguro",
        texto: "Ingresá con tu cuenta y gestioná tus datos con autenticación protegida y roles de usuario.",
        icono: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        ),
    },
]

const pasos = [
    { n: "01", titulo: "Creá tu cuenta", texto: "Registrate en segundos con tu email o con tu cuenta de Google o GitHub." },
    { n: "02", titulo: "Explorá el catálogo", texto: "Buscá por nombre, filtrá por plataforma y mirá el detalle de cada juego." },
    { n: "03", titulo: "Sumá tus títulos", texto: "Si sos administrador, cargá, editá o eliminá juegos desde el panel." },
]

export default function Home() {
    const usuario = useUsuario()
    const { getJuegos } = useApiJuegos()

    const [destacados, setDestacados] = useState([])
    const [estado, setEstado] = useState("loading")

    const email = usuario?.email
    const tieneAcceso = ["admin", "superadmin", "user"].includes(usuario?.rol)
    // URL del CTA principal: catálogo si hay sesión con rol, si no registro.
    const ctaTo = email && tieneAcceso ? "/listado" : "/register"

    // getJuegos se recrea en cada render, pero su comportamiento es estable:
    // el destacado se pide una sola vez al montar.
    useEffect(() => {
        let activo = true
        getJuegos()
            .then((juegos) => {
                if (!activo) return
                setDestacados(juegos.slice(0, 3))
                setEstado("ready")
            })
            .catch(() => activo && setEstado("error"))
        return () => {
            activo = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950 text-white">
                <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />

                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                            Catálogo de videojuegos
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                            Encontrá tu próximo
                            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                juego favorito
                            </span>
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-relaxed text-gray-300 sm:text-lg">
                            Un catálogo ordenado por plataforma y categoría, con precios claros
                            y toda la información a un clic de distancia.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to={ctaTo}
                                className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                            >
                                {email && tieneAcceso ? "Ver el catálogo" : "Empezar gratis"}
                            </Link>
                            <Link
                                to="/contact"
                                className="rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                            >
                                Contactanos
                            </Link>
                        </div>

                        {email && (
                            <p className="mt-6 text-sm text-gray-400">
                                Hola de nuevo, <span className="font-medium text-white">{email}</span> 👋
                            </p>
                        )}
                    </div>

                    <div className="relative flex justify-center md:justify-end">
                        <div className="absolute h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
                        <img
                            src={hero}
                            alt="Logo de la tienda"
                            className="relative w-64 animate-[float_5s_ease-in-out_infinite] drop-shadow-[0_25px_45px_rgba(139,92,246,0.45)] sm:w-80"
                        />
                    </div>
                </div>

                <div className="relative border-t border-white/10 bg-black/20">
                    <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
                        {[
                            ["100+", "Juegos en catálogo"],
                            ["4", "Plataformas"],
                            ["24/7", "Acceso disponible"],
                            ["3", "Formas de ingresar"],
                        ].map(([valor, etiqueta]) => (
                            <div key={etiqueta}>
                                <dt className="text-2xl font-bold text-white">{valor}</dt>
                                <dd className="mt-1 text-xs text-gray-400">{etiqueta}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* FEATURES */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Todo lo que necesitás en un solo lugar
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Diseñado para que navegar, comparar y gestionar juegos sea simple.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <article
                            key={f.titulo}
                            className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
                                    {f.icono}
                                </svg>
                            </div>
                            <h3 className="mt-5 text-base font-semibold text-gray-900">{f.titulo}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.texto}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* DESTACADOS */}
            {estado === "ready" && destacados.length > 0 && (
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Destacados</h2>
                                <p className="mt-2 text-gray-500">Una muestra de lo que vas a encontrar.</p>
                            </div>
                            <Link
                                to={ctaTo}
                                className="text-sm font-semibold text-violet-600 hover:text-violet-500"
                            >
                                Ver todo →
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {destacados.map((juego) => (
                                <Link
                                    key={juego._id}
                                    to={email && tieneAcceso ? `/productos/${juego._id}` : "/register"}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex h-36 items-center justify-center bg-gradient-to-br from-gray-900 to-violet-950 text-5xl">
                                        🎮
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                                                {juego.category || "Sin categoría"}
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {juego.price != null ? `$${juego.price}` : "—"}
                                            </span>
                                        </div>
                                        <h3 className="mt-3 truncate text-base font-semibold text-gray-900 group-hover:text-violet-600">
                                            {juego.name}
                                        </h3>
                                        <p className="mt-1 truncate text-sm text-gray-500">
                                            {juego.platforms || "Plataforma no disponible"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CÓMO FUNCIONA */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-center text-3xl font-bold tracking-tight">Empezá en 3 pasos</h2>
                <div className="mt-14 grid gap-8 sm:grid-cols-3">
                    {pasos.map((p) => (
                        <div key={p.n} className="relative">
                            <span className="text-5xl font-extrabold text-gray-100">{p.n}</span>
                            <h3 className="-mt-3 text-lg font-semibold text-gray-900">{p.titulo}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.texto}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-14 text-center text-white shadow-xl shadow-violet-200">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                    <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
                        ¿Listo para jugar?
                    </h2>
                    <p className="relative mx-auto mt-3 max-w-xl text-violet-100">
                        Creá tu cuenta y empezá a explorar el catálogo. Si ya tenés una,
                        ingresá y seguí desde donde quedaste.
                    </p>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            to={ctaTo}
                            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            {email && tieneAcceso ? "Ir al catálogo" : "Crear cuenta"}
                        </Link>
                        <Link
                            to={email ? "/contact" : "/login"}
                            className="rounded-lg border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            {email ? "Contacto" : "Ya tengo cuenta"}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
