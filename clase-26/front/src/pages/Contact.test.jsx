import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Contact from "./Contact"

// Aislamos react-toastify: no queremos toasts reales ni timers
vi.mock("react-toastify", () => ({
    Bounce: vi.fn(),
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

const { toast } = await import("react-toastify")

const rellenarFormulario = async (user) => {
    await user.type(screen.getByLabelText("Nombre:"), "Ada Lovelace")
    await user.type(screen.getByLabelText("Email:"), "ada@ejemplo.com")
    await user.type(screen.getByLabelText("Asunto:"), "Consulta sobre el catalogo")
    await user.type(
        screen.getByLabelText("Mensaje:"),
        "Hola, queria hacer una consulta sobre un juego en particular."
    )
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("<Contact />", () => {
    it("renderiza el titulo, los 4 campos y el boton de envio", () => {
        render(<Contact />)

        expect(screen.getByRole("heading", { name: "Contacto" })).toBeInTheDocument()
        expect(screen.getByLabelText("Nombre:")).toBeInTheDocument()
        expect(screen.getByLabelText("Email:")).toBeInTheDocument()
        expect(screen.getByLabelText("Asunto:")).toBeInTheDocument()
        expect(screen.getByLabelText("Mensaje:")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeInTheDocument()
    })

    it("muestra los datos de contacto y los links a las redes", () => {
        render(<Contact />)

        expect(screen.getByText("soporte@ejemplo.com")).toBeInTheDocument()
        expect(screen.getByText("+54 11 0000-0000")).toBeInTheDocument()
        expect(screen.getByText("Buenos Aires, Argentina")).toBeInTheDocument()

        const github = screen.getByRole("link", { name: "GitHub" })
        expect(github).toHaveAttribute("target", "_blank")
        expect(github).toHaveAttribute("rel", "noopener noreferrer")
        expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "X" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Discord" })).toBeInTheDocument()
    })

    it("muestra errores de validacion al enviar vacio y no emite toast de exito", async () => {
        const user = userEvent.setup()
        render(<Contact />)

        await user.click(screen.getByRole("button", { name: "Enviar mensaje" }))

        const alerts = await screen.findAllByRole("alert")
        expect(alerts.length).toBeGreaterThanOrEqual(4)
        expect(toast.success).not.toHaveBeenCalled()
    })

    it("muestra el mensaje de error de Zod ante un email invalido", async () => {
        const user = userEvent.setup()
        render(<Contact />)

        await user.type(screen.getByLabelText("Nombre:"), "Ada Lovelace")
        await user.type(screen.getByLabelText("Email:"), "no-es-un-email")
        await user.type(screen.getByLabelText("Asunto:"), "Consulta general")
        await user.type(screen.getByLabelText("Mensaje:"), "Este es un mensaje de prueba suficiente.")
        await user.click(screen.getByRole("button", { name: "Enviar mensaje" }))

        expect(await screen.findByText("El email no tiene un formato valido")).toBeInTheDocument()
        expect(toast.success).not.toHaveBeenCalled()
    })

    it("envia un formulario valido, muestra toast de exito y limpia los campos", async () => {
        const user = userEvent.setup()
        render(<Contact />)

        await rellenarFormulario(user)
        await user.click(screen.getByRole("button", { name: "Enviar mensaje" }))

        // El toast esta mockeado: verificamos la llamada, no el DOM
        await vi.waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1))
        expect(toast.success.mock.calls[0][0]).toMatch(/mensaje enviado/i)
        expect(screen.getByLabelText("Nombre:")).toHaveValue("")
        expect(screen.getByLabelText("Email:")).toHaveValue("")
        expect(screen.getByLabelText("Asunto:")).toHaveValue("")
        expect(screen.getByLabelText("Mensaje:")).toHaveValue("")
    })

    it("no muestra errores al escribir datos validos", async () => {
        const user = userEvent.setup()
        render(<Contact />)

        await rellenarFormulario(user)

        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })
})
