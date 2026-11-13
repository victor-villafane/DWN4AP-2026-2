import { z } from "zod"

export const contactoSchema = z.object({
    nombre: z.string("El nombre es requerido")
        .trim()
        .min(3, "El nombre debe tener como minimo 3 caracteres"),
    email: z.string("El email es requerido")
        .trim()
        .min(1, "El email es requerido")
        .email("El email no tiene un formato valido"),
    asunto: z.string("El asunto es requerido")
        .trim()
        .min(4, "El asunto debe tener como minimo 4 caracteres"),
    mensaje: z.string("El mensaje es requerido")
        .trim()
        .min(10, "El mensaje debe tener como minimo 10 caracteres")
        .max(500, "El mensaje no puede superar los 500 caracteres"),
})
