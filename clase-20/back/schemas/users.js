import z from "zod"

export const usersSchema = z.object({
    _id: z.string()
        .min(24, "Debe tener al menos 24 caracteres")
        .regex(/^[a-f\d]{24}$/i, "El _id debe tener el formato solicitado")
        .optional(),
    email: z.email("El correo tiene que ser valido"),
    name: z.string("El nombre es requerido").min(3, "El nombre debe tener como minimo 3 caracteres"),
    password: z.string("El password es requerido")
        .min(8, "Como minimo debe tener 8 caracteres")
        .regex(/[A-Z]/, "Debe tener una mayuscula")
        .regex(/[a-z]/, "Debe tener una minuscula")
        .regex(/[0-9]/, "Debe tener numeros")
        .regex(/[@_.,_!"·$%&/(=)]/, 'Debe tener un caracter especial @_.,_!"·$%&/(=)'),
    confirmPassword: z.string("El campo confirmacion de password es obligatorio")
})
    .refine((data) => data.password === data.confirmPassword, {
        error: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });