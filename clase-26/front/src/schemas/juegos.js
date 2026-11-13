import { z } from "zod"

export const juegosShema = z.object({
    _id: z.string()
        .min(24, "Debe tener al menos 24 caracteres")
        .regex(/^[a-f\d]{24}$/i, "El _id debe tener el formato solicitado")
        // .regex(/[A-Z]/, "El id debe tener una letra mayuscula")
        .optional(),
    name: z.string("El nombre es requerido").min(3, "El nombre debe tener como minimo 3 caracteres"),
    developer: z.string("El desarrollador es obligatorio").min(3, "El desarrollador tiene que tener como minimo 3 caracteres"),
    publisher: z.string("El distribuidor es obligatorio").min(3, "El distribuidor tiene que tener como minimo 3 caracteres"),
    platforms: z
        .union([
            z.string("La plataforma es obligatoria").min(3),
            z.array(z.string()).min(1, "La plataforma es obligatoria")
        ])
        .transform((value) => Array.isArray(value) ? value.join(";") : value),
    categories: z.string("La categoria es obligatoria").min(3),
    genres: z.string("El genero es obligatorio").min(3),
    price: z.number("El precio es obligatorio").positive("El precio debe ser positivo"),
})